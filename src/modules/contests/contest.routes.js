const auth = require("../../middlewares/auth")
const { createContest } = require("./contest.controller")
const router = require("express").Router()


router.post("/create-contest", auth("admin", "creator"), createContest)




module.exports = router