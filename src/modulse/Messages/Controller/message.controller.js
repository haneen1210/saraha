import userModel from "../../../../DB/models/user.model.js";
import MessageModel from "../../../../DB/models/message.model.js";

export const getMessages = async (req, res) => {
    const messagelist = await MessageModel.find({ receiverId: req.user._id });
    return res.json({ message: "Message", messagelist })
}
export const sendMessages = async (req, res) => {
    const { receiverId } = req.params;
    const { message } = req.body;
    const user = await userModel.findById(receiverId);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    const createMessage = await MessageModel.create({ message, receiverId });
    return res.status(201).json({ message: "success" });
}