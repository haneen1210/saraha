import userModel from "../../../../DB/models/user.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { asynHandler } from "../../../middleware/errorHanding.js";
import bcrypt from 'bcryptjs';

export const profile = async (req, res, next) => {
   
    if (!req.file) {
        return next(new Error("please provide a file"));
    }

    const { secure_url,public_id } = await cloudinary.uploader.upload(req.file.path, {
       folder: `${process.env.APP_NAME}/userx/${req.user._id}/profile`
   })
    const user = await userModel.findByIdAndUpdate(req.user._id, { profilePic:{secure_url,public_id }}, { new: false });
    await cloudinary.uploader.destroy(user.profilePic.public_id);
    return res.json({ message: user });
}



/*
export const profile = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(new Error("please provide a file"));
        }

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APP_NAME}/userx/${req.user._id}/profile`
        });

        const user = await userModel.findById(req.user._id);
        if (!user) {
            return next(new Error("User not found"));
        }

        // حذف الصورة القديمة من Cloudinary إذا كانت موجودة
        if (user.profilePic && user.profilePic.public_id) {
            await cloudinary.uploader.destroy(user.profilePic.public_id);
        }

        user.profilePic = { secure_url, public_id };
        await user.save();

        return res.json({ message: "Profile picture updated successfully", user });
    } catch (error) {
        return next(error);
    }
};
*/

export const coverPic = async (req, res, next) => {
    if (!req.files) {
        return next(new Error("please provide a file"));
    }

    const coverPic = [];
    for (const file of req.files) {
        coverPic.push(`upload/${file.filename}`)
    }
    const user = await userModel.findByIdAndUpdate(req.user._id, { covert: coverPic }, { new: true });

    return res.status(200).json({ message: "success", user });
}

export const updatPassword = async (req, res, next) => {
const {oldPassword,newPassword}=req.body;
const user = await userModel.findById(req.user._id);
const match =bcrypt.compareSync(oldPassword,user.password);

if(!match){
    return next(new Error(`invalid old password`));
}
const hashPassword=bcrypt.hashSync(newPassword,parseInt(process.env.SALTROUND));
user.password=hashPassword;
user.save();
return res.status(200).json({message:"success"});
}

export const shareProfile = async (req, res, next) => {

const user =await userModel.findById(req.params.id).select('userName email');
if(!user){
    return next(new Error('user not found'));
}

return res.json({message:"seccess",user});

}