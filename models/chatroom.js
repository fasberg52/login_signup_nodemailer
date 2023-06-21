const mongoose = require("mongoose");

const Sechma = mongoose.Schema;

const chatroomSchema = new Sechma({
  creator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  contancts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  last_updated: {
    type: Date,
    default: Date.now,
  },
});
const Chatroom = mongoose.model("Chatroom", chatroomSchema);

module.exports = Chatroom;
