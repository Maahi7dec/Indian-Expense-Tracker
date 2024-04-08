const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const connectDb = require("./backend/config/connectDB"); // Corrected path

// Configuring dotenv
dotenv.config();

// Connecting to the database
connectDb();

// Creating express app
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
// User routes
app.use("/api/v1/users", require("./backend/routes/userroute")); // Corrected path
// Transaction routes
app.use("/api/v1/transactions", require("./backend/routes/transactionRoute")); // Corrected path

// Serving static files
app.use(express.static(path.join(__dirname, "./frontend/build")));

// Handling all other routes
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

// Port configuration
const PORT = process.env.PORT || 8090;

// Listening to the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
