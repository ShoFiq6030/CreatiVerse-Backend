const auth = require("../../middlewares/auth")
const { createContest, getContest } = require("./contest.controller")
const router = require("express").Router()


router.post("/create-contest", auth("admin", "creator"), createContest)
router.get("/get-contest", getContest)
router.get("/get-contest-auth", auth("admin", "creator", "user"), getContest)


module.exports = router