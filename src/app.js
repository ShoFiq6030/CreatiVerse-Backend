const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")


const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        //   "https://creati-verse.vercel.app" // frontend live URL
    ],
    credentials: true
}));
app.use(express.json());



// root route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to CreatiVerse API')
})

app.use("/api/v1/auth", require("./modules/auth/auth.routes"));
app.use("/api/v1/contest", require("./modules/contests/contest.routes"));
app.use("/api/v1/submissions", require("./modules/submissions/submission.routes"));
app.use("/api/v1/users", require("./modules/users/user.routes"))


// 404 
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Not Found - ${req.originalUrl}`,
        error: {
            status: 404,
            method: req.method
        }
    });
});



module.exports = app