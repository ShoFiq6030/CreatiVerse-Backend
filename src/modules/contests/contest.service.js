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

const getContestService = async (user) => {

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

module.exports = {
    createContestService,
    getContestService
}