// import express
const express= require ('express');
const { register,login } = require('../controllers/auth.controller');
const { registerValidation, validation,loginValidation } = require('../middleware/validator');
const isAuth = require('../middleware/isAuth');


const router=express.Router()
router.get('/test', (req,res)=>
{
    res.json('Ceci est un test route auth');
});

//register== sign up
router.post('/register',registerValidation(),validation, register);


//login == sign-in
router.post ('/login',loginValidation(),validation, login);

//current
router.get('/current',isAuth,(req,res)=>{res.json(req.user);})

module.exports=router;