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
  host: "mande_db",
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
  const answer = await pool.query("INSERT INTO employees VALUES($1,$2,$3)", values);
  return answer;
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
  console.log(works);
  if (works.rows.length != 0) {
    res.send(works.rows);
  }
});

app.listen(port, () => {
  console.log("The server is running on port 5000");
});
