const {db} =require('./../connection')



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
    }
}