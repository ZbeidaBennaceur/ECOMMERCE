const jwt=require("jsonwebtoken");
const User = require("../model/User");

const isAuth= async (req,res,next)=>{
    try {
        //token exist?
        const token = req.headers["authorization"];

        if(!token) {
            return res.status(400).json({errors:[{msg:'No token found'}]})
        }
        //verify if there is a user for this token 
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        const foundUser=await User.findOne({_id:decode.id})
    if(!foundUser) {
        return res.status(400).json({errors:[{msgs:'User not found'}]})
    }
    req.user=foundUser;
    next();
    
    } catch (error) {
      res.status(400).json({errors:[{msg:"Can't verify"}]})
    }
}
module.exports=isAuth