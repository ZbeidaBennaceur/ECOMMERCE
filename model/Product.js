const mongoose =require ('mongoose')

const productSchema= new mongoose.Schema(
{
    title: {
        type:String, 
        required:true,
        unique:true,
    },
    description: {
        type:String,
    },
    quantity:Number,
    image:{
        type:String,
        default:"https://lonsdale-plasticlemag.s3.eu-west-3.amazonaws.com/516-480-resize_6299bf534fb7d_Adidas-yezzy-450.png"
    },

    price:Number,
    addedBy: 
    {type:mongoose.Schema.Types.ObjectId,
    ref:"User"}

},
{timestamps:true,}

);
const Product=mongoose.model("product", productSchema);
module.exports=Product