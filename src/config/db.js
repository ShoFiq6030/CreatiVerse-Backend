const config = require('./index');
const mongoose = require("mongoose");



const connectDB = async () => {
    try {
        // Use modern connection options and a short server selection timeout
        await mongoose.connect(config.db_connection_str, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message || error);
        // Re-throw so callers can decide how to handle failure
        throw error;
    }
};

// Optional: expose mongoose for advanced usage/tests
module.exports = connectDB;

// connection event listeners
mongoose.connection.on('connected', () => console.log('Mongoose event: connected'));
mongoose.connection.on('reconnected', () => console.log('Mongoose event: reconnected'));
mongoose.connection.on('error', (err) => console.error('Mongoose event: error', err));
mongoose.connection.on('disconnected', () => console.warn('Mongoose event: disconnected'));