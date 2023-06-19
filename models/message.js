const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const messageSchema = new Schema ({
  message: {
    type: String,
    required: true,
  },

  // sender: {
  //   id: mongoose.Scchma.Types.ObjectId,
  //   ref: "User",
  // },
  // resiver: {
  //   id: mongoose.Scchma.Types.ObjectId,
  //   ref: "User",
  // },
  created_at:  {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
