const express = require("express");
const router = express.Router();
const getChatRoom = require("../controllers/chatroom");


const isAuth = require("../middlewares/is-auth");
router.get("/", isAuth, getChatRoom.getChatRoom);



router.get("/", isAuth, getChatRoom.getMessage);
router.post("/", isAuth, getChatRoom.postMessage);




module.exports = router;
