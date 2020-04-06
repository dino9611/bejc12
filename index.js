const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mysql=require('mysql')
const cors=require('cors')
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

const PORT=5000
app.use(cors())//izin ke frontend apapun buat akses backend
app.use(bodyParser.json())//buat user kirim data ke server
app.use(bodyParser.urlencoded({ extended: false }));//buat user kirim data ke server

app.get('/allusers',(req,res)=>{
    db.query('select * from users',(err,result)=>{
        if (err) return res.status(500).send(err)
        // console.log(result)
        return res.status(200).send(result)
    })
})

app.get('/users',(req,res)=>{
    const {username,password}=req.query
    //var sql=`select * from users where username='${req.query.username}' and password='${req.query.password}'`//ini cara pertama
    var sql=`select * from users where username = ? and password = ?`
    db.query(sql,[username,password],(err,result)=>{
        if (err) return res.status(500).send(err)
        return res.status(200).send(result[0])
    })
})

app.post('/users',(req,res)=>{
    console.log(req.body)
    if(req.body.username===''||req.body.password===''){
        return res.status(500).send('woy masukin datanya')
    }
    // var sql=`insert into users (username,password) values('${req.body.username}','${req.body.password}')`//cara pertama
    var sql=`insert into users set ?`//cara kedua
    db.query(sql,req.body,(err,result)=>{
        if (err) return res.status(500).send(err)
        // console.log('masuk')
        db.query('select * from users',(err,result1)=>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(result1)
        })
    })
})

app.put(`/users/:id`,(req,res)=>{
    console.log('params',req.params)
    console.log(req.body)
    var sql=`update users set ? where id=${req.params.id}`
    db.query(sql,req.body,(err,result)=>{
        if (err) return res.status(500).send(err)
        db.query('select * from users',(err,result1)=>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(result1)
        })
    })
})

app.delete(`/users/:id`,(req,res)=>{
    var sql=`delete from users where id=${req.params.id}`
    db.query(sql,req.body,(err,result)=>{
        if (err) return res.status(500).send(err)
        db.query('select * from users',(err,result1)=>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(result1)
        })
    })
})


app.listen(PORT,()=>console.log('server jalan di '+PORT))

