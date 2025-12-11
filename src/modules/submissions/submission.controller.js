const { submitContestSubmissionService } = require("./submission.service")


const submitContestSubmission = async (req, res) => {
    try {
        const { contestId } = req.params
        const payload = req.body
        const { id: userId } = req.user

        if (!payload.submissionText) {
            res.status(400).json({
                success: false,
                message: "submissionText is require"
            })
            return
        }
        const result = await submitContestSubmissionService(contestId, payload, userId)
        // console.log(result);

        res.status(201).json({
            success: true,
            message: "Submission submit successfully ",
            data: result
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


module.exports = {
    submitContestSubmission
}