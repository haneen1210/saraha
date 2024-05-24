
import mongoose, { Schema, model ,Types} from 'mongoose';
const PostSchema = new Schema({
title:{
    type:String,
    required:true,
},
caption:{
    type:String,
},
image:{
    type:Object,
    required:true,
},
userId:{
    type:Types.ObjectId,
    ref:'User',
    required:true,
},
like:[{type:Types.ObjectId, ref:'User',}],
unlike:[{type:Types.ObjectId, ref:'User',}],
isDeleted:{type:Boolean,default:false},
totalValue:{type:Number,default:0},

}
,{
    timestamps:true,
});
const PostModel= mongoose.models.Post || model('Post',PostSchema);
export default PostModel;
