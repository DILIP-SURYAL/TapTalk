import { uploadOnCloudinary } from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let { message } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    let newMessage = await Message.create({ sender, receiver, message, image });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    const receiverSocketId = getReceiverSocketId(receiver);
    console.log("receiverSocketId", receiverSocketId);
    if (receiverSocketId) {
      console.log("receiverSocketId", receiverSocketId);
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("message sent to receiver");
    }

    return res.status(201).json(newMessage);
  } catch (e) {
    return res.status().json({ messsage: "erro in sendMessage", e });
  }
};

export const getMessages = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    return res.status(200).json(conversation.messages);
  } catch (e) {
    return res.status(500).json({ message: "prob in getMessage", e });
  }
};
