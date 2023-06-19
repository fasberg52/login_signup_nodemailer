const mongoose = require("mongoose");

const Sechma = mongoose.Schema;

const messageSchema = new Sechma({
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
  created_at: Date,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
