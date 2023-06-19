

exports.getChatRoom = (req, res) => {
  res.render("chatroom/index", {
    path: "/",
    pageTitle: "چت اپ",
    isAuthenticated: req.session.isLoggedIn,
  });
};

