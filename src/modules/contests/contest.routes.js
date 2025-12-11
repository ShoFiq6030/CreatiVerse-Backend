const auth = require("../../middlewares/auth")
const { createContest, getContests, getContestById, updateContestById, deleteContestById, getPopularContests, declareWinner } = require("./contest.controller")
const router = require("express").Router()


router.post("/create-contest", auth("admin", "creator"), createContest)
router.get("/get-contests", getContests)
router.get("/get-popular-contests", getPopularContests)

router.get("/get-contests-auth", auth("admin", "creator", "user"), getContests)
router.get("/get-contest/:contestId", auth(), getContestById)
router.patch("/update-contest/:contestId", auth("admin", "creator"), updateContestById)
router.patch("/declare-winner/:contestId/:userId/:submissionId", auth("admin", "creator"), declareWinner)
router.delete("/delete-contest/:contestId", auth("admin", "creator"), deleteContestById)


module.exports = router