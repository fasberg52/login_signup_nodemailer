const cookieParser = require("../util/cookieParser");

exports.getMessage = (req, res) => {
  
  res.render("message/index", {
    path: "/",
    pageTitle: "چت اپ",

  });
};
