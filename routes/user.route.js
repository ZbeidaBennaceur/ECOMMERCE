const express=require('express')
const { getAllUsers, deleteUser } = require('../controllers/user.controller')
const isAdmin = require('../middleware/isAdmin')

const router =express.Router()

//test de la route
//router.get('/test',(req,res)=>{
   // res.status(200).json({msg:"Ceci est un test de la route user"})
//})

//admin va lister tous les users
router.get("/allUsers",isAdmin,getAllUsers )

//admin supprime un utilisateur

router.delete('/:id',isAdmin,deleteUser)


module.exports=router;