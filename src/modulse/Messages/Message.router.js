import  express  from "express";
import * as messageControler from './Controller/message.controller.js';
import {asynHandler} from '../../middleware/errorHanding.js';
import { auth } from "../../middleware/Auth.middleware.js";
const app=express();
app.post('/:receiverId',asynHandler(messageControler.sendMessages));
app.get('/',auth,messageControler.getMessages);

export default app;