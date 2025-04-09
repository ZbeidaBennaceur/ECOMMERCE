const express=require('express');
const { addProduct, getAllProd, getOneProduct, getMyProd, editProd, deleteProd } = require('../controllers/product.controller');
const isAuth = require ('../middleware/isAuth')


const router=express.Router()

//test de la route
router.get('/test', (req,res)=>{
   res.status(200).json("Route ok")

})

router.post('/addProd',isAuth, addProduct)
router.get('/allProduct',getAllProd)
router.get('/myProd',isAuth, getMyProd)
router.get('/:id',getOneProduct)
router.put('/:id',isAuth,editProd)
router.delete('/:id',isAuth,deleteProd)


module.exports=router;