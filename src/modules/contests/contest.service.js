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

const getContestsService = async (user, search, type, sort, page = 1,
    limit = 10) => {

    let query
    if (user.role === "admin") {
        query = {}
    }
    else if (user.role === "creator") {
        query = { creator: user.id }
    } else {
        query = { status: "approve" }
    }


    if (search) {
        query.name = { $regex: search, $options: "i" };
    }
    if (type && type !== "All") {
        query.contestType = type;
    }

    // Sorting Logic

    let sortQuery = {};

    if (sort === "newest") sortQuery.createdAt = -1;
    if (sort === "oldest") sortQuery.createdAt = 1;
    if (sort === "deadline") sortQuery.deadline = 1;
    if (sort === "prize") sortQuery.prizeMoney = -1;
    if (sort === "participants") sortQuery.participantsCount = -1;


    //  Pagination Logic
    const skip = (page - 1) * limit;

    const contests = await Contest.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(Number(limit));

    const total = await Contest.countDocuments(query);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        contests
    };

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

const getPopularContestsService = async () => {
    const result = await Contest.find({ status: "approve" }).sort({ participantsCount: -1 }).limit(6)
    return result

}


module.exports = {
    createContestService,
    getContestsService,
    getContestService,
    updateContestService,
    deleteContestService,
    getPopularContestsService
}