const { createContestService, getContestsService, getContestService, updateContestService } = require("./contest.service")


const createContest = async (req, res) => {

    try {
        const user = req.user
        console.log(user);
        const payload = req.body
        const result = await createContestService(user, payload)
        res.status(201).json({
            success: true,
            message: "Contest Create Successfully",
            data: result
        })

    } catch (error) {
        console.log(error.massage);
        res.status(500).json({
            success: false,
            message: error.massage
        })
    }




}

const getContests = async (req, res) => {

    try {

        let user = req.user

        if (!user) {
            user = {
                role: "user"
            }
        }

        const result = await getContestsService(user)

        res.status(200).json({
            success: true,
            massage: "contest fetch successfully",
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            massage: error.massage
        })

    }



}

const getContestById = async (req, res) => {
    try {
        const { contestId } = req.params
        const result = await getContestService(contestId)

        if (result) {
            res.status(200).json({
                success: true,
                massage: "Data fetch successfully",
                data: result

            })
        } else {
            res.status(400).json({
                success: false,
                massage: "Contest not found",

            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            massage: error.message
        })
    }

}

const updateContestById = async (req, res) => {
    const { contestId } = req.params
    const payload = req.body
    const user= req.user

    const result = await updateContestService(contestId, payload,user)
    console.log(result);

    if (!result) {
        res.status(400).json({
            success: true,
            message: "contest not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "contest update successfully",
        data: result
    })

}

module.exports = {
    createContest,
    getContests,
    getContestById,
    updateContestById
}

