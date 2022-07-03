const express = require('express')
const {Pool} = require('pg')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
//Body-parser for post request:
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// Database
var mensaje = ""
const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'pg123',
  database: 'postgres'
}
const pool = new Pool(config)

const getUser = async(values) =>{
  const answer = await pool.query('SELECT * FROM users WHERE user_phone=$1 AND email=$2', values)
  return answer
  }

app.post("/user", async(req, res)=>{
  var email = req.body.useremail
  var phone = req.body.userphone
  const values = [phone, email]
  const answer = await getUser(values);
  if(answer.rows.length == 0){
    mensaje = "El usuario no existe"
  }else{
    mensaje = "El usuario está registrado"
  }
  res.send(mensaje);
})
app.listen(port, ()=>{
  console.log("The server is running on port 5000")
})
