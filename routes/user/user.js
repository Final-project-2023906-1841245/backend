var express = require("express");
var router = express.Router();
const query = require("../pool_connection");
const geocode = require("../geocode.js");
const multer  = require('multer');

var upload = multer({ storage: storage });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});



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

<<<<<<< HEAD
router.post('/principalpage/upload', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  var response = JSON.stringify(req.file.path);
 
  res.send(JSON.stringify(req.file.path));
 
=======
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
>>>>>>> 66d1480f4a2dbb18cd32a6efaf81d5aff17951b4
});

module.exports = router;
