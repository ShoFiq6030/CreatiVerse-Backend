const Contest = require("../contests/contest.model")
const Submission = require("./submission.model")

const submitContestSubmissionService = async (contestId, payload, userId) => {

    const contest = await Contest.findById(contestId)

    if (!contest) {
        throw new Error("contest not found")
    }
    if (contest.status !== "approve") {
        throw new Error("This contest is not open for submission yet");
    }
    if (contest.deadline && new Date() > new Date(contest.deadline)) {
        throw new Error("Submission deadline has passed");
    }

    const already = await Submission.findOne({ contestId, userId });
    if (already) {
        throw new Error("You have already submitted to this contest");
    }


    const result = await Submission.create({
        contestId,
        ...payload,
        userId
    })

    return result


}

const getAllSubmissionByContestIdService = async (contestId) => {
    // console.log("inside service");
    const result = await Submission.find({ contestId })
    // console.log(result);
    return result
}

module.exports = {
    submitContestSubmissionService,
    getAllSubmissionByContestIdService
}