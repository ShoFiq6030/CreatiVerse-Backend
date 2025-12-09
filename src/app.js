const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")


const app = express();

app.use(cors());
app.use(express.json());

// connect to database
connectDB()

// root route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to CreatiVerse API')
})

app.use("/api/v1/auth", require("./modules/auth/auth.routes"));


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