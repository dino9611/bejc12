const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const cors=require('cors')
const bearertoken=require('express-bearer-token')

const PORT=5000
app.use(cors())//izin ke frontend apapun buat akses backend
app.use(bearertoken())
app.use(bodyParser.json())//buat user kirim data ke server
app.use(bodyParser.urlencoded({ extended: false }));//buat user kirim data ke server
app.use(express.static('public'))


app.get('/',(req,res)=>{
    return res.send('<h1>Selamat datang di Api JC12</h1>')
})

const {UserRouters,FotoRouters,MovieRouters}=require('./routers')


app.use('/users',UserRouters)
app.use('/foto',FotoRouters)
app.use('/movie',MovieRouters)


app.listen(PORT,()=>console.log('server jalan di '+PORT))

