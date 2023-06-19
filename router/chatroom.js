const express = require("express");
const router = express.Router();
const getChatRoom = require("../controllers/chatroom");
const messageController = require("../controllers/message");

const isAuth = require("../middlewares/is-auth");
router.get("/", isAuth, getChatRoom.getChatRoom);


router.get("/", isAuth, messageController.getMessage);
router.post("/", isAuth, messageController.postMessage);




module.exports = router;
