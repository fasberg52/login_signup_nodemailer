const Message = require("../models/message");
const User = require("../models/user");
exports.getChatRoom = (req, res) => {
  Message.find()

    .then((messages) => {
      res.render("chatroom/index", {
        messages: messages,

        pageTitle: "message user",
        path: "/",
        user: req.session.user,
 
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.getMessage = (req, res) => {
  Message.find()
    .then((messages) => {
      res.render("chatroom/index", {
        messages: messages,
        pageTitle: "Message User",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
       
      });
    })
    .catch((error) => {
      console.log(error);
      // Handle the error appropriately
      res.status(500).send("An error occurred");
    });
};
exports.postMessage = (req, res) => {
  const message = req.body.message;

  const messages = new Message({
    message: message,
    created_at:
    isAuthenticated: req.session.isLoggedIn,
  });
  messages.save().then((result) => {
    console.log("created Message");
    res.redirect("/");
  });
};
