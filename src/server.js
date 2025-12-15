const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');




const port = config.port || 3000;
// start server
const startServer = async () => {
    try {

        // Connect to DB 
        await connectDB();

        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};

startServer();

// Fail on unhandled promise rejections so we don't continue in bad state
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});