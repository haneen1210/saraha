import mongoose from "mongoose";
 const connectDB = async()=>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(()=>{
        console.log("db connection ");
    })
    .catch((error)=>{
        console.log(`error to db connection : ${error}`);
    });
 }
 export default connectDB