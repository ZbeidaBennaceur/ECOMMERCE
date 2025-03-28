//require mongoose
const mongoose=require('mongoose')


const connectDB= async() => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('DB CONNECTED :)')
    } catch (error) {
        console.error(('DB NOT CONNECTED :('));
        process.exit(1) //exit if we can't connect
        
    }
}

module.exports=connectDB;