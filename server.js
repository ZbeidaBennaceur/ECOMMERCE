
//01 Imports (require)

const express=require("express");
const connectDB = require("./config/connectDB");
require("dotenv").config();



//02 Instance de express
const app=express();

//MIDDLEWARE
app.use(express.json())

//Connexion à la database
connectDB();

//06 ROUTES
//Route pour authentification
app.use('/api/auth', require('./routes/auth.route'));
console.log("Routes auth bien chargées !")
//Route pour la manipulation des users par l'admin
app.use('/api/user', require('./routes/user.route'));
//Route pour la manipulation des produits
app.use('/api/product', require('./routes/product.route'));
// 03 PORT
const PORT=process.env.PORT || 7500;

//Listen to PORT
app.listen(PORT,(err)=>{
    err
    ? console.log(err)
    : console.log(`Le serveur est sur le port:http://localhost:${PORT}`);
});