const mysql=require('mysql')
const db=mysql.createConnection({
    host:'localhost',
    user:'dino9611',
    password:'tungkal01',//dari workbench
    database:'hokikijc12',
    port:'3306'
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('connect sudah')
})


module.exports=db