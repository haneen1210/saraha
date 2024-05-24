import  express  from "express";
import * as UserControler from './controller/User.controller.js';
import {auth} from '../../middleware/Auth.middleware.js';
import {asynHandler} from '../../middleware/errorHanding.js';
import FileUpload,{filevalidation} from '../../services/multer.js';
import * as validators from './user.validation.js';
import validation from "../../middleware/Validation.js";
const app=express();

app.get('/',auth,FileUpload(filevalidation.image).single('image'),validation(validators.profile),asynHandler(UserControler.profile));
app.patch('/cover',auth,FileUpload(filevalidation.image).array('image',5),asynHandler(UserControler.coverPic));
app.patch('/updatPassword',auth,validation(validators.updatPassword),asynHandler(UserControler.updatPassword));
app.get('/:id/profile',auth,validation(validators.shareProfile),asynHandler(UserControler.shareProfile));
export default app;



