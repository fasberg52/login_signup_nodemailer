const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");
const isAuth = require("../middlewares/is-auth");
router.get("/", isAuth, messageController.getMessage);

module.exports = router;
