import userModel from "../../DB/models/user.model.js";
import jwt from 'jsonwebtoken'
import { asynHandler } from './errorHanding.js';

export const auth = asynHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARERKEY)) {
        return res.json({ message: "invalid authorization" });
    }

    const token = authorization.split(process.env.BEARERKEY)[1];
    if (!token) {
        return res.status(409).json({ message: "invalid authorization" });
    }
    const decoded = jwt.verify(token, process.env.LOGINSIGNATURE)
    const authUser = await userModel.findById(decoded.id).select("userName email");
    if (!authUser) {
        return res.status(409).json({ message: "not register account" });
    }
    req.user = authUser;
    next();
}
)