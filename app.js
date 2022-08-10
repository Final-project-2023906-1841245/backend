const express = require("express");
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
/* Routers definition*/
const userRouter = require("./routes/user/user.js");
const employeeRouter = require("./routes/employee/employee.js");

/*Routers use*/
app.use("/user", userRouter);
app.use("/employee", employeeRouter);




app.listen(port, () => {
  console.log("The server is running on port 5000");
});
