var express = require("express");
var router = express.Router();
const query = require("../pool_connection");
const multer = require("multer");

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
  var email = req.body.useremail;
  var phone = req.body.userphone;
  const ans = await query(
    "SELECT * FROM users WHERE user_phone=$1 AND email=$2",
    [phone, email]
  );
  if (ans.rows.length == 0) {
    res.send(false);
  } else {
    res.send(true);
  }
});

router.post("/signup", async (req, res) => {
  var name = req.body.username;
  var email = req.body.useremail;
  var phone = req.body.userphone;
  var address = req.body.useraddress;
  var description = req.body.userdescription;
  geocode(req.body.useraddress).then((data) => {
    var lon = data.data[0].longitude
    var lat = data.data[0].latitude
    const coordinates = [lon, lat]
    const values = [phone, name, email, description];
    query(
      "SELECT * FROM users WHERE user_phone=$1 AND email=$2",
      [phone, email]
    ).then((response) => {
      const searchUser = response
      if (searchUser.rows.length == 0) {
        query("INSERT INTO users(user_phone, user_name, email, user_description) VALUES($1,$2,$3,$4)", values).then(() => {
          query(`UPDATE users SET geolocation = ST_MakePoint(${coordinates[0]}, ${coordinates[1]}) WHERE user_phone=$1`, [phone]).then(() => {
            res.send(true);
          })
        }).catch(() => { res.send(false); })

      }
    })
  }
  )

});

router.post("/principalpage", async (req, res) => {
  var idphone = req.body.phone;
  const userInfo = await query("SELECT * FROM users WHERE user_phone=$1", [
    idphone,
  ]);
  if (userInfo.rows.length !== 0) {
    res.send(JSON.stringify(userInfo.rows));
  }
});

router.get("/principalpage/jobslist", async (req, res) => {
  const works = await query("SELECT work_name, id_work FROM works");
  console.log(works)
  res.send(works.rows);
});

router.post("/getworkers", async (req, res) => {
  var user_phone = req.body.phone;
  var work_name = req.body.work_name;
  var values = [work_name, user_phone];
  const workers = await query("SELECT * FROM getWorkers($1, $2)", values);
  if (workers.rows.length !== 0) {
    res.send(workers.rows);
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
  var phone = req.body[0];
  var img = req.body[1];
  await query("UPDATE users SET img=$1 WHERE user_phone=$2", [img, phone]);
});
// geocode("1600 Pennsylvania Ave NW, Washington DC");


router.post("/hire", async (req, res) => {

  var idemployee = req.body.employeeid;
  var serviceid = parseInt(req.body.serviceid);
  var userid = req.body.userid;
  var hiredate = req.body.hiredate;
  var servicedescription = req.body.servicedescription;
  var paymentmethod = req.body.paymentmethod;

  console.log(req.body)
  
  const values = [idemployee, serviceid, userid, hiredate, servicedescription, paymentmethod];
  const inserthire = await query(
    "SELECT * FROM hires",
  );
  if (inserthire.rows.length >= 0) {
    await query("INSERT INTO hires(id_employee, id_work, user_phone, hire_date, hire_description,  hire_paymethod) VALUES($1,$2,$3,$4,$5,$6)", values);
    res.send(true);
  } else {
    res.send(false);
  }
});

router.post("/gethires", async (req, res) => {
  var idphone = req.body.phone;

  const userHires = await query("SELECT * FROM hires AS h JOIN works AS w ON w.id_work = h.id_work WHERE user_phone=$1", [
    idphone,
  ]);
  console.log(userHires.body);
  if (userHires.rows.length !== 0) {
    res.send(JSON.stringify(userHires.rows));
    
  }
});

module.exports = router;
