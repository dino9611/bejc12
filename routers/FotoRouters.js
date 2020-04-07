const express=require('express')
const {Fotocontrollers}=require('./../controllers')

const router=express.Router()

router.get('/foto',Fotocontrollers.getfoto)
router.post('/foto',Fotocontrollers.postphoto)


module.exports=router