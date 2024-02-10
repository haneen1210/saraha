import  express  from "express";
import * as UserControler from './controller/User.controller.js';
import {auth} from '../../middleware/Auth.middleware.js';
import {asynHandler} from '../../middleware/errorHanding.js';
import FileUpload,{filevalidation} from '../../services/multer.js';
const app=express();

app.get('/',auth,FileUpload(filevalidation.image).single('image'),asynHandler(UserControler.profile));

export default app;



