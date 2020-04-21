const express=require('express')
const {Moviecontrollers}=require('./../controllers')
const router=express.Router()

router.get('/getallmovies',Moviecontrollers.getallmovies)
router.post('/postmovies',Moviecontrollers.addmovies)
router.put('/editmovies/:id',Moviecontrollers.editMovie)
router.delete('/deletemovies/:id',Moviecontrollers.deleteMovies)


module.exports=router