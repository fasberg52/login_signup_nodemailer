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
        }
        req.flash("error", "پسورد شما اشتباه است");
        return res.redirect("/login");
      });
    });
  };


//   ----------------------------------------------------------------
exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({
      email: email,
    }).then((user) => {
      if (!user) {
        req.flash("error", "ایمیل شما اشتباه است!");
        return res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            console.log(err);
            res.redirect("/");
          });
        }
        req.flash("error", "پسورد شما اشتباه است !");
        res.redirect("/login");
      });
    });
  };