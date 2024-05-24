import messageRouter from './Messages/Message.router.js'
import AuthRouter from './Auth/Auth.router.js'
import UserRouter from './User/User.router.js'
import PostRouter from './post/post.router.js'
import connectDB from '../../DB/connection.js'
import cors from 'cors'
import { globalErrorHandler } from '../middleware/errorHanding.js'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const initApp = (app, express) => {
    const fullPath = path.join(__dirname, '../upload');
    connectDB();
    app.use(cors());
    app.use('/upload', express.static(fullPath));
    app.use(express.json());
    app.use('/messages', messageRouter);
    app.use('/Auth', AuthRouter);
    app.use('/User', UserRouter);
    app.use('/Post',PostRouter);
    app.use('*', (req, res) => {
        return res.json({ message: 'page not found' });
    });
    app.use(globalErrorHandler)
}
export default initApp;