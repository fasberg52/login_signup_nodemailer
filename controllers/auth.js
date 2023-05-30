const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res) => {
  let messageEmail = req.flash("error");
  if (messageEmail.length > 0) {
    messageEmail = messageEmail[0];
  } else {
    messageEmail = null;
  }
  let messagePass = req.flash("errorPass");
  if (messagePass.length > 0) {
    messagePass = messagePass[0];
  } else {
    messagePass = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "ورود",
    errorMessage: messageEmail,
    errorPassword: messagePass,
  });
};

exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      req.flash("error", "ایمیل اشتباه است");
      return res.redirect("/login");
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        retrun = req.session.save((err) => {
          console.log(err);
          res.redirect("/");
        });
      } else {
        req.flash("errorPass", "پسورد شما اشتباه است");
        return res.redirect("/login");
      }
    });
  });
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "ثبت نام",
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          name: name,
          password: hashedPassword,
        });
        return user.save();
      });
    })
    .then(() => {
      res.redirect("/login");
      console.log(`user signed up - email : ${email}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
