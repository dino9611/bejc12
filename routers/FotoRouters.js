const express=require('express')
const {Fotocontrollers}=require('./../controllers')

const router=express.Router()

router.get('/foto',Fotocontrollers.getfoto)
router.post('/foto',Fotocontrollers.postphoto)
router.delete('/foto/:id',Fotocontrollers.deletefoto)
router.put('/foto/:id',Fotocontrollers.editphoto)
router.get('/kataenc',Fotocontrollers.encryptkata)
router.get('/kirimemail',Fotocontrollers.kirimemail)


module.exports=router