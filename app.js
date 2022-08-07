const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors = require("cors");
const fetch = require("node-fetch");
app.use(cors());
app.options("*", cors());
//Body-parser for post request:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Database
var mensaje = "";
const config = {
  user: "postgres",
  host: "localhost",
  password: "pg123",
  database: "mande_db",
  port: 5432,
};
const pool = new Pool(config);

const getUser = async (values) => {
  const answer = await pool.query(
    "SELECT * FROM users WHERE user_phone=$1 AND email=$2",
    values
  );
  return answer;
};

const getEmployeeWork = async (values) => {
  const answer = await pool.query(
    "SELECT w.work_name FROM employeework AS ew JOIN works AS w ON w.id_work = ew.id_work WHERE id_employee=$1",
    values
  );
  return answer;
};

const getUser1 = async (values) => {
  const answer = await pool.query("SELECT * FROM users WHERE user_phone=$1", [
    values,
  ]);
  return answer;
};

const getEmployee = async (values) => {
  const answer = await pool.query(
    "SELECT * FROM employees WHERE id_employee=$1",
    values
  );
  return answer;
};

const insertUser = async (values) => {
  const answer = await pool.query("INSERT INTO users VALUES($1,$2,$3)", values);
  return answer;
};

const insertEmployee = async (values) => {
  const answer = await pool.query(
    "INSERT INTO employees VALUES($1,$2,$3)",
    values
  );
  return answer;
};
const insertWorks = async (val) => {
  for (i = 0; i < val[1].length; i++) {
    console.log("Me he ejecutado");
    var id_work = await getIdWork([val[1][i]]);
    var values = [val[0], id_work, val[2][i]];
    await pool.query("INSERT INTO employeework VALUES ($1, $2, $3)", values);
  }
};

const getIdWork = async (workname) => {
  const id = await pool.query(
    "SELECT id_work FROM works WHERE work_name=$1",
    workname
  );
  return id.rows[0].id_work;
};
const getWorks = async () => {
  const answer = await pool.query("SELECT work_name FROM works");
  return answer;
};

const geocode = async (address) => {
  const encodedAddress = encodeURIComponent(address).replaceAll("%2C", ",");
  console.log(encodedAddress);
  const key = "ed56555d4bc461f0a49d040823bd24a0";
  const url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${encodedAddress}`;
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      if (data) {
        const lat = data.data[0].latitude;
        const lon = data.data[0].longitude;
        console.log(lat);
        console.log(lon);
      }
    });
};

app.post("/userlogin", async (req, res) => {
  var email = req.body.useremail;
  var phone = req.body.userphone;
  const values = [phone, email];
  const answer = await getUser(values);
  if (answer.rows.length == 0) {
    res.send(false);
  } else {
    res.send(true);
  }
});

app.post("/employeelogin", async (req, res) => {
  var id = req.body.employeeid;
  const values = [id];
  const answer = await getEmployee(values);
  if (answer.rows.length == 0) {
    res.send(false);
  } else {
    res.send(true);
  }
});

app.post("/userprincipalpage", async (req, res) => {
  var idphone = req.body.phone;
  const userInfo = await getUser1(idphone);
  if (userInfo.rows.length !== 0) {
    res.send(JSON.stringify(userInfo.rows));
  }
});

app.post("/employeeprincipalpage", async (req, res) => {
  var employeeid = req.body.id;
  const employeeInfo = await getEmployee([employeeid]);

  const employeeWork = await getEmployeeWork([employeeid]);
  console.log(employeeWork);
 
  
  if (employeeInfo.rows.length !== 0  ) {
    res.send(JSON.stringify(employeeInfo.rows));
    res.send(JSON.stringify(employeeWork.rows));

  }
  
});


app.post("/employeeworks", async (req, res) => {
  var id = req.body.employeeid;
  var works = req.body.employeeworks;
  var prices = req.body.employeeprices;
  var values = [id, works, prices];
  insertWorks(values);
});

app.post("/usersignup", async (req, res) => {
  var name = req.body.username;
  var email = req.body.useremail;
  var phone = req.body.userphone;
  var address = req.body.useraddress;
  geocode(address);
  const values = [phone, name, email];
  const searchUser = await getUser([phone, email]);
  if (searchUser.rows.length == 0) {
    await insertUser(values);
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post("/employeesignup", async (req, res) => {
  var name = req.body.employeename;
  var email = req.body.employeeemail;
  var id = req.body.employeeid;
  var address = req.body.employeeaddress;
  geocode(address);
  const values = [id, name, email];
  const searchEmployee = await getEmployee([id]);
  if (searchEmployee.rows.length == 0) {
    await insertEmployee(values);
    res.send(true);
  } else {
    res.send(false);
  }
});

app.get("/employeeworks", async (req, res) => {
  const works = await getWorks();
  if (works.rows.length != 0) {
    res.send(works.rows);
  }
});

app.listen(port, () => {
  console.log("The server is running on port 5000");
});
