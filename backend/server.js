const app = require("./app");
const connectDatabase = require("./db/Database");

// The 'process' core module of Node.js provides the 'env' property
const { PORT, HOST } = process.env;

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for handling uncaught exception");
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "../backend/config/.env" });
}

// Connect db
connectDatabase();

// Create server
const server = app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log("Shutting down the server for unhandle promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
