const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
    db_connection_str: process.env.MONGODB_CONNECTION_STRING,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    gmail_address: process.env.GMAIL_USER,
    app_password: process.env.GOOGLE_APP_PASSWORD,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_redirect_url: process.env.GOOGLE_REDIRECT_URL || process.env.FRONTEND_URL || "http://localhost:5173",
    frontend_url: process.env.FRONTEND_URL || "http://localhost:5173",
};

module.exports = config;
