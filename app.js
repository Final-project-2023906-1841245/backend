const express = require('express')
const {Pool} = require('pg')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const cors = require('cors');
app.use(cors());
app.options('*', cors());
//Body-parser for post request:
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// Database
var mensaje = ""
const config = {
  user: 'postgres',
  host: 'postgres',
  password: 'pg123',
  database: 'mande_db',
  port: 5432
}
const pool = new Pool(config)

const getUser = async(values) =>{
  const answer = await pool.query('SELECT * FROM users WHERE user_phone=$1 AND email=$2', values)
  return answer
}

const insertUser = async(values) =>{
  const answer = await pool.query('INSERT INTO users VALUES($1,$2,$3)', values)
  return answer
}

app.post("/userlogin", async(req, res)=>{
  var email = req.body.useremail
  var phone = req.body.userphone
  const values = [phone, email]
  const answer = await getUser(values);
  if(answer.rows.length == 0){
    res.send(false)
  }else{
    res.send(true)
  }
})

app.post("/usersignup", async(req, res)=>{
  var name = req.body.username
  var email = req.body.useremail
  var phone = req.body.userphone
  const values = [phone, name, email]
  const searchUser = await getUser([phone, email]);
  if(searchUser.rows.length == 0){
    await insertUser(values)
    res.send(true)
  }else{
    res.send(false)
  }
})

app.listen(port, ()=>{
  console.log("The server is running on port 5000") });
