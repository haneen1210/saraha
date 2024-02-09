import  express  from "express";
import * as UserControler from './Controller/User.controller.js';
import {auth} from '../../middleware/Auth.middleware.js';
import {asynHandler} from '../../middleware/errorHanding.js';
const app=express();

app.get('/',auth,asynHandler(UserControler.profile));

export default app;