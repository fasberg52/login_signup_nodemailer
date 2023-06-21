const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chatRoom: {
    type: mongoose.Types.ObjectId,
    ref: "ChatRoom",
    
  },
  message: {
    type: String,
    
  },

  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
