const auth = require("../../middlewares/auth")
const router = require("express").Router()
const { submitContestSubmission, getAllSubmissionByContestId } = require("./submission.controller")




router.post("/:contestId", auth("user"), submitContestSubmission)
router.get("/:contestId", getAllSubmissionByContestId)




module.exports = router