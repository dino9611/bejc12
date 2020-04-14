const express=require('express')
const {Usercontrollers}=require('./../controllers')
const {auth}=require('./../helper/Auth')
const router=express.Router()

router.get('/allusers',Usercontrollers.allusers)
router.get('/users',Usercontrollers.users)
router.post('/users',Usercontrollers.addusers)
router.put('/users/:id',Usercontrollers.editusers)
router.delete('users/:id',Usercontrollers.deleteusers)
router.post('/register',Usercontrollers.userregister)
router.get('/keeplogin/:idusers',Usercontrollers.keeplogin)
router.put('/verified',Usercontrollers.userverified)
router.get('/login',Usercontrollers.login)
router.get('/createtoken',Usercontrollers.generatetoken)
router.get('/tokenberubah',auth,Usercontrollers.tokenberubah)


module.exports=router