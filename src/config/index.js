const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
    db_connection_str: process.env.MONGODB_CONNECTION_STRING,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
