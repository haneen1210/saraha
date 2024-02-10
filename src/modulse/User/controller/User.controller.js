import userModel from "../../../../DB/models/user.model.js";
import cloudinary from "../../../services/cloudinary.js";
import {asynHandler} from "../../../middleware/errorHanding.js";

export const profile = async (req, res) => {

  
    //const imageUrl= req.file.destination + '/' + req.file.filename;
//const user= await userModel.findByIdAndUpdate(req.user._id,{profilePic:imageUrl}, { new: true });

    //return res.json({ message: user });
const {secure_url} = await cloudinary.uploader.upload(req.file.path,{
    folder:`${process.env.APP_NAME}/userx/${req.user._id}/profile`
})

const user= await userModel.findByIdAndUpdate(req.user._id,{profilePic:secure_url}, { new: true });
return res.json({ message: user });
}