var express = require("express");
var router = express.Router();
const query = require("../pool_connection");
const geocode = require("../geocode.js");

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
  geocode(address);
  const values = [id, name, email];
  const searchEmployee = await query(
    "SELECT * FROM employees WHERE id_employee=$1",
    [id]
  );
  if (searchEmployee.rows.length == 0) {
    await query("INSERT INTO employees VALUES($1,$2,$3)", values);
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
  const employeeInfo = await query(
    "SELECT * FROM employees WHERE id_employee=$1",
    [employeeid]
  );
  if (employeeInfo.rows.length !== 0) {
    res.send(JSON.stringify(employeeInfo.rows));
  }
});
module.exports = router;
