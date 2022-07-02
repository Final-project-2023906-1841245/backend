const express = require('express')
const {Pool} = require('pg')
const app = express()
const port = 5000
// Database
const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'pg123',
  database: 'postgres'
}
const pool = new Pool(config)

const getUser = async() =>{
  const ans = await pool.query('SELECT * FROM users WHERE user_phone=1231')
  if(ans.rows.length == 0){
    return "No se encontró el hp usuario, sapo"
  }
  else{
    return "Sí se encontró crack"
  }
}
app.get("/user", async(req, res)=>{
  const ans =await getUser();
  res.send(ans)
})
app.listen(port, ()=>{
  console.log("The server is running on port 5000")
})



