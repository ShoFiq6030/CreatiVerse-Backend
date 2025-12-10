const { createContestService } = require("./contest.service")


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

module.exports = {
    createContest
}

