const auth = require("../../middlewares/auth")
const router = require("express").Router()
const { submitContestSubmission } = require("./submission.controller")




router.post("/:contestId", auth("user"), submitContestSubmission)



module.exports = router