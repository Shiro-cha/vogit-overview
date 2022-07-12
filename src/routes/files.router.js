const express = require("express")
const files = require("../controllers/files.controller")
let router = express.Router()


router.post("/",files.getDirectory)

module.exports = router
