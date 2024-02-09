import  express  from "express";
import * as AuthControler from './controller/Auth.controller.js';
import {asynHandler} from '../../middleware/errorHanding.js';
import validation from  '../../middleware/Validation.js';
import {signupSchema,signinSchema} from './Auth.validation.js';
const app=express();

app.post('/signup',validation(signupSchema),asynHandler(AuthControler.signup));
app.get('/signin',validation(signinSchema),asynHandler(AuthControler.signin));
app.get('/confirmEmail/:token',asynHandler(AuthControler.confirmEmail));
app.get('/NewconfirmEmail/:refreshtoken',asynHandler(AuthControler.NewconfirmEmail));
export default app;


