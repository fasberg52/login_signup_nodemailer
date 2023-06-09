const express = require("express");
const User = require("./models/user");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const csrf = require("csurf");
const Port = 3000;
const MONGODB_URI = "mongodb://127.0.0.1:27017/messangerFarawin";
const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "session",
});

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const chatroomRouter = require("./router/chatroom");
const authRouter = require("./router/auth");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "dont talk more and just show your code",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(flash());
app.use(csrfProtection);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(chatroomRouter);
app.use(authRouter);

mongoose
  .connect(MONGODB_URI)
  .then(connection => {
    console.log(`connecting to mongodb ${MONGODB_URI}`)
  })
  .then((result) => {
    app.listen(Port, () => {
      console.log(`app running on ${Port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
