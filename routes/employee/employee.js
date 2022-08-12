var express = require("express");
var router = express.Router();
const query = require("../pool_connection");
const multer = require('multer');

const fetch = require("node-fetch");

const geocode = async (address) => {
  const encodedAddress = encodeURIComponent(address).replace(/%2C/g, ',');
  const key = "ed56555d4bc461f0a49d040823bd24a0";
  const url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${encodedAddress}`;
  return fetch(url)
    .then((response) => {
      return response.json().then((data) => {
        return (data);
      }).catch((err) => {
        console.log(err)
      })
    })


};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");


router.post("/login", async (req, res) => {
  var id = req.body.employeeid;
  const values = [id];
  const answer = await query(
    "SELECT * FROM employees WHERE id_employee=$1",
    values
  );
  if (answer.rows.length == 0) {
    res.send(false);
  } else {
    res.send(true);
  }
});


router.post("/signup", async (req, res) => {
  var name = req.body.employeename;
  var email = req.body.employeeemail;
  var id = req.body.employeeid;
  var address = req.body.employeeaddress;
  var description = req.body.employeedescription;
  geocode(req.body.employeeaddress).then((data) => {
    var lon = data.data[0].longitude
    var lat = data.data[0].latitude
    const coordinates = [lon, lat]
    const values = [id, name, email, description];
    query(
      "SELECT * FROM employees WHERE id_employee=$1",
      [id]
    ).then((response) => {
      const searchEmployee = response
      if (searchEmployee.rows.length == 0) {
        query("INSERT INTO employees(id_employee, employee_name, email, employee_description) VALUES($1,$2,$3,$4)", values).then(() => {
          query(`UPDATE employees SET geolocation = ST_MakePoint(${coordinates[0]}, ${coordinates[1]}) WHERE id_employee=$1`, [id]).then(() => {
            res.send(true);
          })
        }).catch(() => { res.send(false); })

      }
    })
  }
  )

});



router.get("/works", async (req, res) => {
  const works = await query("SELECT work_name FROM works");
  if (works.rows.length != 0) {
    res.send(works.rows);
  }
});

router.post("/works", async (req, res) => {
  var id = req.body.employeeid;
  var works = req.body.employeeworks;
  var prices = req.body.employeeprices;
  var values = [id, works, prices];
  for (i = 0; i < values[1].length; i++) {
    var response = await query("SELECT id_work FROM works WHERE work_name=$1", [
      values[1][i],
    ]);
    var workid = response.rows[0].id_work;
    var data = [values[0], workid, values[2][i]];
    await query("INSERT INTO employeework VALUES ($1, $2, $3)", data);
  }
});

router.post("/principalpage", async (req, res) => {
  var employeeid = req.body.id;
  const employeeinfo = await query(
    "SELECT * FROM employees WHERE id_employee=$1",
    [employeeid]
  );

  const employeework = await query(
    "SELECT w.work_name FROM employeework AS ew JOIN works AS w ON w.id_work = ew.id_work WHERE id_employee=$1",
    [employeeid]
  );
  var info = [employeeinfo.rows, employeework.rows];
  if (employeeinfo.rows.length !== 0) {
    res.write(JSON.stringify(info));
    res.end();
  }
});


router.post("/principalpage/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(req.file);
  });
});

router.post("/principalpage/inserturl", async (req, res) => {
  var id = req.body[0];
  var img = req.body[1];
  await query("UPDATE employees SET img=$1 WHERE id_employee=$2", [img, id]);
});

router.post("/gethires", async (req, res) => {
  var idemployee = req.body.employeeid;


  const employeeHires = await query("SELECT * FROM hires AS h JOIN works AS w ON w.id_work = h.id_work WHERE id_employee=$1", [
    idemployee,
  ]);
  if (employeeHires.rows.length !== 0) {
    res.send(JSON.stringify(employeeHires.rows));
   
  }
});

module.exports = router;
