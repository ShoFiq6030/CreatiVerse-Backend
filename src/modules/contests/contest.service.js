const Contest = require("../users/contest.model")


const createContestService = async (user, payload) => {
    const { contestName, image, description, taskInstruction, price, prizeMoney, contestType, deadline } = payload

    if (!contestName | !image | !description | !taskInstruction | !price | !prizeMoney | !contestType | !deadline) {
        throw new Error("(contestName, image, description, taskInstruction, price, prizeMoney, contestType, deadline) all the fields are required")
    }
    const creator = user.id


    const contest = await Contest.create({
        contestName,
        image,
        description,
        taskInstruction,
        price,
        prizeMoney,
        contestType,
        deadline,
        creator
    })

    return contest

}

const getContestsService = async (user) => {

    let query
    if (user.role === "admin") {
        query = {}
    }
    else if (user.role === "creator") {
        query = { creator: user.id }
    } else {
        query = { status: "approve" }
    }


    const result = await Contest.find(query)

    return result

}

const getContestService = async (contestId) => {

    const contest = await Contest.findById(contestId)

    return contest

}

const updateContestService = async (contestId, payload, user) => {
    const contest = await Contest.findById(contestId)
    if (!contest) {
        throw new Error("contest not found")
    }
    if (user.role !== "admin") {
        if (contest.status === "approve") {
            throw new Error("contest can't be update when approve")
        }
    }


    const result = await Contest.findByIdAndUpdate(
        contestId,
        payload,
        { new: true }
    );

    return result


}

const deleteContestService = async (contestId, user) => {
    const contest = await Contest.findById(contestId)
    console.log(user.role);
    console.log(contest);


    if (!contest) {
        return
    }
    if (user.role !== "admin") {
        if (contest.status === "approve") {
            throw new Error("contest can't be delete when it's approve")
        }
    }
    const result = Contest.findOneAndDelete(contestId)

    return result

}

module.exports = {
    createContestService,
    getContestsService,
    getContestService,
    updateContestService,
    deleteContestService
}