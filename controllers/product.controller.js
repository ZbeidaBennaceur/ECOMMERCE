const Product = require("../model/Product")


exports.addProduct=async(req,res)=>
{
    try {
        const newProd= new Product({...req.body,addedBy:req.user.id});
        await newProd.save()
        res.status(200).json({msg:"Product adedd successfully",newProd})
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getAllProd=async(req,res)=>{
    try {
        const listProd=await Product.find()
        res.status(200).json({msg:"All product list",listProd})
    } catch (error) {
        res.status(400).json(error);
    }

}

exports.getOneProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const prodToGet= await Product.findById(id);
        if(!prodToGet) {
            return res.status(404).json({msg:"Product not found"})
        }

        res.status(200).json({msg:"The product is ",prodToGet})
    } catch (error) {
        res.status(400).json(error);
    }

}

exports.getMyProd=async(req,res)=>{
    try {
        const myProdList=await Product.find({addedBy:req.user._id});
        res.status(200).json({msg:"My product list ", myProdList})
        
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.editProd=async(req,res)=>{
    try {
        const {id} = req.params //produit à editer
        const prodToChange=req.body //modification 
        const prodToEdit=await Product.findByIdAndUpdate(id,prodToChange,{new:true});
        if(prodToEdit.addedBy!=req.user._id.toString()) {
            return res.status(404).json({msg:"Product not found"})
        }
        res.status(200).json({msg:"Product edited with success", prodToEdit})
        
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.deleteProd=async(req,res)=>{
    try {
        const {id}=req.params;
        const prodToDel=await Product.findByIdAndDelete(id)
       if(prodToDel.addedBy!=req.user._id.toString()) {
        return res.status(404).json({msg:"Product not found"})
       }
        res.status(200).json({msg:"Product deleted with success", prodToDel})
        
    } catch (error) {
        res.status(400).json(error);
    }
}