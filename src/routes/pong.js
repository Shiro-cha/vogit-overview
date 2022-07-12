const express = require("express")
const pong = require("../controllers/pong.controller")
let router = express.Router()


router.post("/",pong.postPing)

module.exports = router 
