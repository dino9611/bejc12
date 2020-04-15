const mysql=require('mysql')
// const db=mysql.createConnection({
//     host:'localhost',
//     user:'dino9611',
//     password:'tungkal01',//dari workbench
//     database:'hokikijc12',
//     port:'3306'
// })
const db=mysql.createConnection({
    host:'db4free.net',
    user:'dino96112',
    password:'tungkal01',//dari workbench
    database:'jc12hokihoki',
    port:'3306'
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('connect sudah')
})


module.exports=db