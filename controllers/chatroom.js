const Message = require("../models/message");
const User = require("../models/user");
const ChatRoom = require("../models/chatroom");
exports.getChatRoom = async (req, res) => {

  ChatRoom.findById({})
  .then( (chatrooms) =>{
    res.render("chatroom/index", {
      pageTitle: "Chat Room",
      path: "/chatroom",
      creator_id:req.user.userid,
      participant_id:req.user.userid

    })
  }).catch(error => {console.log(error);})

}
  //   $or: [{ sender: userId }, { receiver: userId }],
  // })
  //   .populate("sender", "email")
  //   .then((messages) => {
  //     res.render("chatroom/index", {
  //       messages: messages,

  //       pageTitle: "message user",
  //       path: "/",
  //       user: req.session.user,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

exports.addChatroom = async (req, res) => {
  try {
    const newChatroom = new Chatroom({
      creator: {
        id: req.user.userid,
        name: req.user.username,
        avatar: req.user.avatar || null,
      },
      participant: {
        name: req.body.participant,
        id: req.body.id,
        avatar: req.body.avatar || null,
      },
    });

    const result = await newConversation.save();
    res.status(200).json({
      message: "Conversation was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};
// get message >>>>>>>>>>>>>>>>>>>>>>>>
// exports.getMessage = (req, res) => {

//   Message.find()
//     .then((messages) => {
//       res.render("chatroom/index", {
//         messages: messages,
//         pageTitle: "Message User",
//         path: "/",
//         isAuthenticated: req.session.isLoggedIn,
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       // Handle the error appropriately
//       res.status(500).send("An error occurred");
//     });
// };
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getMessage = (req, res) => {
  const userId = req.session.user._id;

  Message.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate("sender", "email")
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
exports.postMessage = (req, res) => {
  const message = req.body.message;
  const sender = req.session.user._id;
  const receiver = req.params.receiver;
  const newMessages = new Message({
    message: message,
    sender: sender,
    receiver: receiver,
    // created_at: message.created_at,
    isAuthenticated: req.session.isLoggedIn,
  });
  newMessages
    .save()
    .then((result) => {
      console.log("created Message");
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

// exports.searchUsers = async (req, res) => {
//   const { query } = req.body;

//   try {
//     console.log("Query:", query);

//     const users = await User.find({
//       $or: [
//         { name: { $regex: query, $options: "i" } },
//         { email: { $regex: query, $options: "i" } },
//       ],
//     });

//     console.log("Users:", users);

//     res.json(users);
//   } catch (error) {
//     console.error("Search Users Error:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while searching for users." });
//   }
// };

exports.searchUsers = async (req, res) => {
  const user = req.body.user;
  const name_search_regex = new RegExp(user.name);
  const email_search_regex = new RegExp(user.email);

  try {
    const users = await User.find({
      $or: [
        {
          name: name_search_regex,
        },
        {
          email: email_search_regex,
        },
      ],
    });

    res.json(users);
  } catch (error) {
    console.error("Search for users Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for receivers." });
  }
};
