const mongoose = require("mongoose");

const Sechma = mongoose.Schema;

const chatroomSchema = new Sechma({
  pv_chat: {
    type: mongoose.Types.ObjectId,
    ref: "Message",
  },
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

module.exports = Chatroom;
