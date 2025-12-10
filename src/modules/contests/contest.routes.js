const auth = require("../../middlewares/auth")
const { createContest, getContests, getContestById,updateContestById } = require("./contest.controller")
const router = require("express").Router()


router.post("/create-contest", auth("admin", "creator"), createContest)
router.get("/get-contest", getContests)
router.get("/get-contest-auth", auth("admin", "creator", "user"), getContests)
router.get("/get-contest/:contestId", auth(), getContestById)
router.patch("/update-contest/:contestId", auth("admin", "creator"), updateContestById)


module.exports = router