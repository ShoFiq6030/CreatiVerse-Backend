const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const mongoose = require('mongoose');


const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        //   "https://creati-verse.vercel.app" // frontend live URL
    ],
    credentials: true
}));
app.use(express.json());

// Ensure DB connection for serverless environments (Vercel)
const ensureDbConnected = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await connectDB();
        }
        return next();
    } catch (err) {
        console.error('DB connection error on request:', err.message || err);
        return res.status(500).json({ success: false, message: 'Database connection error' });
    }
};

app.use(ensureDbConnected);



// root route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to CreatiVerse API')
})

// health check (useful for deployments)
app.get('/health', (req, res) => {
    const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
    res.status(200).json({ success: true, dbState: state });
});

app.use("/api/v1/auth", require("./modules/auth/auth.routes"));
app.use("/api/v1/contest", require("./modules/contests/contest.routes"));
app.use("/api/v1/submissions", require("./modules/submissions/submission.routes"));
app.use("/api/v1/users", require("./modules/users/user.routes"));


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
