
//import userModel from "../../../../DB/models/user.model.js";
//import cloudinary from "../../../services/cloudinary.js";
//import { asynHandler } from "../../../middleware/errorHanding.js";
//import bcrypt from 'bcryptjs';

import commentModel from "../../../../DB/models/comment.model.js";
import PostModel from "../../../../DB/models/post.model.js";
import cloudinary from "../../../services/cloudinary.js";

export const create = async (req, res, next) => {
    const { title, caption } = req.body;
    const id = req.user._id;
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: 'post' });
    const post = await PostModel.create({ title, caption, image: { secure_url, public_id }, userId: id })
    return res.json({ message: "success", post });
}


export const likePost = async (req, res, next) => {
    const { id } = req.params;//id post
    const user_id = req.user._id;

    const post = await PostModel.findByIdAndUpdate(id, { $addToSet: { like: user_id } },
        {
            new: true
        })
    post.totalvote = post.like.length - post.unlike.length;
    await post.save();
    return res.status(200).json({ message: "success", post });
}

export const unlikePost = async (req, res, next) => {
    const { id } = req.params;//id post
    const user_id = req.user._id;

    const post = await PostModel.findByIdAndUpdate(id, { $addToSet: { unlike: user_id }, $pull: { like: user_id } },
        {
            new: true
        })
    post.totalvote = post.like.length - post.unlike.length;
    await post.save();
    return res.status(200).json({ message: "success", post });
}

export const getPost = async (req, res, next) => {
const posts = await PostModel.find({}).populate([

    {
        path:'userId',
        select:'userName'
    },
    {
        path:'like',
        select:'userName'  
    },

    {
        path:'unlike',
        select:'userName'  
    }
 
]);

const postList = [];
for(const post of posts){
    const comment = await commentModel.find({postId:post._id});
    postList.push({post,comment});
}
return res.status(200).json({message:"success",posts});
}
