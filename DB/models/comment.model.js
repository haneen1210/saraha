
import mongoose, { Schema, model ,Types} from 'mongoose';
const commentSchema = new Schema({
text:{
    type:String,
    required:true,
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
postId:{type:Types.ObjectId,ref:'Post',required:true},
like:[{type:Types.ObjectId, ref:'User',}],
unlike:[{type:Types.ObjectId, ref:'User',}],
isDeleted:{type:Boolean,default:false},

}
,{
    timestamps:true,
});
const commentModel= mongoose.models.comment || model('comment',commentSchema);
export default commentModel;
