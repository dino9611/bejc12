const express=require('express')
const {Usercontrollers}=require('./../controllers')

const router=express.Router()

router.get('/allusers',Usercontrollers.allusers)
router.get('/users',Usercontrollers.users)
router.post('/users',Usercontrollers.addusers)
router.put('/users/:id',Usercontrollers.editusers)
router.delete('users/:id',Usercontrollers.deleteusers)
router.post('/register',Usercontrollers.userregister)

module.exports=router