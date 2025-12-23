const Contest = require("./contest.model")
const User = require("../users/user.model")
const Submission = require("../submissions/submission.model")
const { default: mongoose } = require("mongoose")



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

const getContestsService = async (user, search, type, sort, page,
    limit) => {

    let query
    if (user.role === "admin") {
        query = {}
    }
    else if (user.role === "creator") {
        query = { creator: user.id }
    } else {
        query = { status: "approved" }
    }


    if (search) {
        query.contestName = { $regex: search, $options: "i" };
    }
    if (type && type !== "all") {
        query.contestType = { $regex: type, $options: "i" };
    }

    // Sorting Logic

    let sortQuery = {};

    if (sort === "newest") sortQuery.createdAt = -1;
    if (sort === "oldest") sortQuery.createdAt = 1;
    if (sort === "deadline-asc") sortQuery.deadline = 1;
    if (sort === "deadline-desc") sortQuery.deadline = -1;
    if (sort === "prize-desc") sortQuery.price = -1;
    if (sort === "prize-asc") sortQuery.price = 1;
    if (sort === "participants") sortQuery.participantsCount = -1;

    // console.log(query);
    //  Pagination Logic
    const skip = (page - 1) * limit;
    // console.log(query);

    const contests = await Contest.find(query)
        .populate("creator", "name email profileImage")
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

    const contest = await Contest.findById(contestId).populate("creator", "name email profileImage")

    return contest

}

const updateContestService = async (contestId, payload, user) => {
    const contest = await Contest.findById(contestId)
    if (!contest) {
        return ({ error: "contest not found" })
    }
    if (user.role !== "admin") {
        if (contest.status === "approve") {
            return ({ error: "contest can't be update when approve" })
        } else {
            return ({ error: "only admin can update contest" })
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
    // console.log(user.role);
    // console.log(contest);


    if (!contest) {
        return ({ error: "contest not found" })
    }
    if (user.role !== "admin") {
        if (contest.status === "approve") {
            return ({ error: "contest can't be delete when it's approve" })
        }
    }
    const result = Contest.findByIdAndDelete(contestId)

    return result

}

const getPopularContestsService = async () => {
    const result = await Contest.find({ status: "approved" }).populate("creator", "name email profileImage").sort({ participantsCount: -1 }).limit(6)
    return result

}

const declareWinnerService = async (contestId, userId, submissionId) => {

    // Check if contest exists
    const contest = await Contest.findById(contestId);
    if (!contest) {
        throw new Error("Contest not found");
    }

    // Check if submission exists
    const submission = await Submission.findById(submissionId);
    if (!submission) {
        throw new Error("Submission not found");
    }

    // Check if submission belongs to contest
    if (submission.contestId.toString() !== contestId) {
        throw new Error("This submission does not belong to this contest");
    }

    // Check if submission belongs to the selected user
    if (submission.userId.toString() !== userId) {
        throw new Error("Selected user did not submit this submission");
    }

    // Check if winner already exists
    if (contest.winner && contest.winner.user) {
        throw new Error("Winner already declared for this contest");
    }

    const result = await Contest.findByIdAndUpdate(contestId, {
        winner: {
            user: userId,
            submissionId,
            deadline: new Date(),
        },
        status: "completed"

    }, { new: true })
    return result
}

const getLeaderboardService = async () => {
    // 1️⃣ Get completed contests
    const contests = await Contest.find({ status: "completed" })
        .select("_id winner prizeMoney")
        .lean();

    const contestMap = {};
    const completedContestIds = [];

    contests.forEach((c) => {
        contestMap[c._id.toString()] = c;
        completedContestIds.push(c._id);
    });

    // 2️⃣ Get submissions only for completed contests
    const submissions = await Submission.find({
        contestId: { $in: completedContestIds },
    })
        .select("userId contestId")
        .lean();

    const leaderboardMap = {};

    const normalizeId = (value) => {
        if (!value) return null;
        if (typeof value === "object" && value._id) return value._id.toString();
        if (mongoose.isValidObjectId(value)) return value.toString();
        return null;
    };

    // 3️⃣ Count participation from submissions
    submissions.forEach((sub) => {
        const userId = normalizeId(sub.userId);
        const contestId = normalizeId(sub.contestId);
        if (!userId || !contestId) return;

        if (!leaderboardMap[userId]) {
            leaderboardMap[userId] = {
                userId,
                winCount: 0,
                participantCount: 0,
                totalPrizeEarning: 0,
            };
        }

        leaderboardMap[userId].participantCount += 1;
    });

    // 4️⃣ Count wins & earnings
    contests.forEach((contest) => {
        const winnerId = normalizeId(contest.winner.user);
        if (!winnerId) return;

        if (!leaderboardMap[winnerId]) {
            leaderboardMap[winnerId] = {
                userId: winnerId,
                winCount: 0,
                participantCount: 0,
                totalPrizeEarning: 0,
            };
        }

        leaderboardMap[winnerId].winCount += 1;
        leaderboardMap[winnerId].totalPrizeEarning += contest.prizeMoney || 0;
    });

    // 5️⃣ Attach user info
    const userObjectIds = Object.keys(leaderboardMap)
        .filter((id) => mongoose.isValidObjectId(id))
        .map((id) => new mongoose.Types.ObjectId(id));

    const users = await User.find({ _id: { $in: userObjectIds } })
        .select("name email profileImage role")
        .lean();

    const userMap = {};
    users.forEach((u) => {
        userMap[u._id.toString()] = u;
    });

    // 6️⃣ Final leaderboard array
    return Object.values(leaderboardMap)
        .map((entry) => ({
            user: userMap[entry.userId] || null,
            winCount: entry.winCount,
            participantCount: entry.participantCount,
            totalPrizeEarning: entry.totalPrizeEarning,
        }))
        .sort((a, b) => {
            if (b.winCount !== a.winCount) return b.winCount - a.winCount;
            if (b.totalPrizeEarning !== a.totalPrizeEarning)
                return b.totalPrizeEarning - a.totalPrizeEarning;
            return b.participantCount - a.participantCount;
        });
};


module.exports = {
    createContestService,
    getContestsService,
    getContestService,
    updateContestService,
    deleteContestService,
    getPopularContestsService, declareWinnerService, getLeaderboardService
}