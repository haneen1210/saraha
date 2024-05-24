import * as dotenv from 'dotenv'
dotenv.config();
import  express  from "express";
import initApp from "./src/modulse/app.router.js";
const app=express();
const PORT=process.env.PORT|| 3000;
initApp(app,express);
app.get('/',(req,res)=>{
    return res.json("welcome");
})
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})