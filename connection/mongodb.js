const {ObjectID,MongoClient}=require('mongodb')

// const url=`mongodb+srv://dino9611:tungkal11@cluster0-hgc7b.mongodb.net/test?retryWrites=true&w=majority`
// const url='mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb/iflix'
const url='mongodb://localhost:27017/'
module.exports={
    ObjectID,
    MongoClient,
    url
}