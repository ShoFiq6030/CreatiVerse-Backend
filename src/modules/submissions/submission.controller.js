const Contest = require("../contests/contest.model")

const { submitContestSubmissionService, getAllSubmissionByContestIdService } = require("./submission.service")


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
        // Update contest
        await Contest.findByIdAndUpdate(
            contestId,
            {
                $inc: { participantsCount: 1 },      // increase count
                $addToSet: {                          // avoid duplicates
                    participants: userId,
                    submissions: result._id
                }
            },
            { new: true }
        );

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

const getAllSubmissionByContestId = async (req, res) => {

    try {
        const { contestId } = req.params

        const result = await getAllSubmissionByContestIdService(contestId)
        if (!result) {
            res.status(400).json({
                success: false,
                message: "submissions not found with this contest id"
            }
            )
        }

        res.status(200).json({
            success: true,
            message: "data fetch successfully",
            data: result
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}


module.exports = {
    submitContestSubmission,
    getAllSubmissionByContestId
}