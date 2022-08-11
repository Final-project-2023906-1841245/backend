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
  // geocode(address);
  const values = [phone, name, email, description];
  const searchUser = await query(
    "SELECT * FROM users WHERE user_phone=$1 AND email=$2",
    [phone, email]
  );
  if (searchUser.rows.length == 0) {
    await query("INSERT INTO users VALUES($1,$2,$3,$4)", values);
    res.send(true);
  } else {
    res.send(false);
  }
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
  const works = await query("SELECT work_name FROM works");
  res.send(works.rows);
});

router.post("/getworkers", async (req, res) => {
  var user_phone = req.body.phone;
  var work_name = req.body.work_name;
  var values = [work_name, user_phone];
  const workers = await query("SELECT * FROM getWorkers($1, $2)", values);
  if (workers.rows.length !== 0) {
    console.log(workers.rows);
    res.send(workers.rows);
  }
});

router.post('/principalpage/upload', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  var response = JSON.stringify(req.file.path);
 
  res.send(JSON.stringify(req.file.path));
 
});

router.post("/hire", async (req, res) => {
  var idemployee = req.body.idemployee;

  var userid = req.body.userid;
  var hiredate = req.body.hiredate;
  var servicedescription = req.body.servicedescription;
  var paymentmethod = req.body.paymentmethod;

  
  
  const values = [idemployee, userid, hiredate, servicedescription, paymentmethod];
  const inserthire = await query(
    "SELECT * FROM hires WHERE user_phone=$1 AND email=$2",
    [phone, email]
  );
  if (inserthire.rows.length == 0) {
    await query("INSERT INTO users VALUES($1,$2,$3,$4)", values);
    res.send(true);
  } else {
    res.send(false);
  }
});


module.exports = router;
