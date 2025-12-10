const { createContestService, getContestService } = require("./contest.service")


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

const getContest = async (req, res) => {

    try {

        let user = req.user

        if (!user) {
            user = {
                role: "user"
            }
        }

        const result = await getContestService(user)

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

module.exports = {
    createContest,
    getContest
}

