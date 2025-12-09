const config = require('./index');
const mongoose = require("mongoose");



 const connectDB = async () => {
    try {
        await mongoose.connect(config.db_connection_str);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.log(error);

    }

}
module.exports = connectDB;