const {db} =require('./../connection')
const transporter=require('./../helper/mailer')
const encrypt=require('./../helper/crypto')

module.exports={
    allusers:(req,res)=>{
        db.query('select * from users',(err,result)=>{
            if (err) return res.status(500).send(err)
            // console.log(result)
            return res.status(200).send(result)
        })
    },
    users(req,res){
        const {username,password}=req.query
        //var sql=`select * from users where username='${req.query.username}' and password='${req.query.password}'`//ini cara pertama
        var sql=`select * from users where username = ? and password = ?`
        db.query(sql,[username,password],(err,result)=>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(result[0])
        })
    },
    addusers:(req,res)=>{
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
    },
    editusers:(req,res)=>{
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
    },
    deleteusers:(req,res)=>{
        var sql=`delete from users where id=${req.params.id}`
        db.query(sql,req.body,(err,result)=>{
            if (err) return res.status(500).send(err)
            db.query('select * from users',(err,result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    userregister:(req,res)=>{
        const {username,password,email}=req.body
        const hashpass=encrypt(password)
        var sql=`select * from users where username='${username}'`
        db.query(sql,(err,result)=>{
            if (err) return res.status(500).send(err)
            if(result.length){
                return res.status(500).send({message:'username telah dipakai'})
            }else{
                sql=`insert into users set ?`
                var data={
                    username:username,
                    password:hashpass,
                    email
                }
                db.query(sql,data,(err,result1)=>{
                    if (err) return res.status(500).send(err)
                    var LinkVerifikasi=`http://localhost:3000/verified?userid=${result1.insertId}&password=${hashpass}`
                    transporter.sendMail({
                        from:'Hokage <aldinorahman36@gmail.com>',
                        to:email,
                        subject:'Misi Level A',
                        html:`tolong klik link ini untuk verifikasi :
                        <a href=${LinkVerifikasi}>MInimales verified</a>`,                        
                    },(err,result2)=>{
                        if (err) return res.status(500).send(err)
                        sql=`select * from users where id=${result1.insertId}`
                        db.query(sql,(err,result3)=>{
                            if (err) return res.status(500).send(err)
                            return res.status(200).send(result3[0])
                        })
                    })
                })
            }
        })


    },
    keeplogin:(req,res)=>{
        const {idusers}=req.params
        var sql=`select * from users where id=${idusers}`
        db.query(sql,(err,result)=>{
            if(err){
                return res.status(500).send(err)
            }
            return res.status(200).send(result[0])
        })
    }
}