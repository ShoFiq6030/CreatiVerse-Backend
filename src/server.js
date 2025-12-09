const app = require('./app');
const config = require('./config');




const port = config.port || 3000;
// start server
const startServer = async () => {
    try {

        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};

startServer();