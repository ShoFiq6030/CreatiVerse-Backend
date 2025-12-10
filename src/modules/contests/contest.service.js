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

module.exports = {
    createContestService
}