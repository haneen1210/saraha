import  express  from "express";
import * as postControler from './controller/post.controller.js';
import * as commentontroler from './controller/comment.controller.js';
import {auth} from '../../middleware/Auth.middleware.js';
import {asynHandler} from '../../middleware/errorHanding.js';
import FileUpload,{filevalidation} from '../../services/multer.js';
import * as validators from '../User/user.validation.js';
import validation from "../../middleware/Validation.js";
const app=express();

app.post('/',auth,FileUpload(filevalidation.image).single('image'),validation(validators.profile),asynHandler(postControler.create));
app.patch('/:id/like',auth,asynHandler(postControler.likePost));
app.patch('/:id/unlike',auth,asynHandler(postControler.unlikePost));
app.post('/:id/comment',auth,FileUpload(filevalidation.image).single('image'),validation(validators.profile),asynHandler(commentontroler.createComment));
app.get('/',asynHandler(postControler.getPost));
export default app;
