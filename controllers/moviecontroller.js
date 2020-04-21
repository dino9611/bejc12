const {mongodb}=require('./../connection')
const {MongoClient,ObjectID,url}=mongodb
const database='iflix'
const collection='movies'

// const client=new MongoClient(url)

module.exports={
    getallmovies:(req,res)=>{
        MongoClient.connect(url,{useUnifiedTopology: true}, (err,client)=>{
            // assert.equal(null,err)
            var title
            if(!req.query.title){
                title={}
            }else{
                title={title:{'$regex':req.query.title,'$options':'i'}} //select * from where title like %black%
            }
            if(err) console.log(err)
            var moviescol=client.db(database).collection(collection)
            moviescol.find(title).limit(20).toArray((err,result)=>{// select * from movies 
                client.close()
                if(err) res.status(500).send(err)
                res.status(200).send(result)
            })
        })
    },
    addmovies:(req,res)=>{
        MongoClient.connect(url,{ useUnifiedTopology: true},(err,client)=>{
            var movie= client.db(database).collection(collection)
            movie.insertMany(req.body.data,(err1,result)=>{//insert many array of object
                client.close()
                if(err1) res.status.send(err1)
                res.status(200).send(result)
            })
        })
    },
    deleteMovies:(req,res)=>{
        MongoClient.connect(url,{ useUnifiedTopology: true},(err,client)=>{
            var movie= client.db(database).collection(collection)
            movie.deleteOne({_id: new ObjectID(req.params.id)},(err,result)=>{ //delete users where id=dasdsa
                client.close()
                if(err) res.status.send(err)
                res.status(200).send(result)
            })
        })
    },
    editMovie:(req,res)=>{
        if(!req.body.unset){
            req.body.unset={"wibu":""}
        }
        MongoClient.connect(url,{useUnifiedTopology: true},(err,client)=>{
            var movie= client.db(database).collection(collection)
            movie.updateOne({_id: new ObjectID(req.params.id)},{$set:req.body.set,$unset:req.body.unset},(err,result)=>{
                client.close()
                if(err) res.status.send(err)
                res.status(200).send(result)
            })
        })
    } 
}