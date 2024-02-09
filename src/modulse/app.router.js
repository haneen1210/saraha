import messageRouter from './Messages/Message.router.js'
import AuthRouter from './Auth/Auth.router.js'
import UserRouter from './User/User.router.js'
import connectDB from '../../DB/connection.js'
import cors from 'cors'
const initApp=(app,express)=>{
connectDB();  
app.use(cors());
app.use(express.json());
app.use('/messages',messageRouter);
app.use('/Auth',AuthRouter);
app.use('/User',UserRouter);
app.use('*',(req,res)=>{
return res.json({message:'page not found'});
});

}
export default initApp;