const config = require('./index');
const mongoose = require('mongoose');

const connectDB = async () => {
    if (!config.db_connection_str) {
        const err = new Error('MONGODB_CONNECTION_STRING is not set');
        console.error('❌', err.message);
        throw err;
    }

    try {
        await mongoose.connect(config.db_connection_str);
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message || err);
        throw err;
    }
};

module.exports = connectDB;