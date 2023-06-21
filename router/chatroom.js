const express = require("express");
const router = express.Router();
const getChatRoom = require("../controllers/chatroom");

const isAuth = require("../middlewares/is-auth");
router.get("/", isAuth, getChatRoom.getChatRoom);

router.post("/search", getChatRoom.searchUsers);

router.post("/chatroom",getChatRoom.addChatroom);

router.get("/", isAuth, getChatRoom.getMessage);
router.post("/", isAuth, getChatRoom.postMessage);

module.exports = router;
