var express = require("express");
var router = express.Router();
const query = require("../pool_connection");
const geocode = require("../geocode.js");
const multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });


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
  // geocode(address);
  const values = [id, name, email, description];
  const searchEmployee = await query(
    "SELECT * FROM employees WHERE id_employee=$1",
    [id]
  );
  if (searchEmployee.rows.length == 0) {
    await query("INSERT INTO employees VALUES($1,$2,$3,$4)", values);
    res.send(true);
  } else {
    res.send(false);
  }
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

router.post('/principalpage/upload', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  var response = JSON.stringify(req.file.path);
 
  res.send(JSON.stringify(req.file.path));
 
});

module.exports = router;
