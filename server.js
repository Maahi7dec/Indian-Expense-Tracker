const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const axios = require("axios");

// Configuring dotenv
dotenv.config();

// Creating express app
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Proxy middleware
app.use("/api", (req, res) => {
  const apiUrl = `https://fair-pear-mite-cape.cyclic.app/api/v1/users/login`; // Replace with your API server URL
  axios({
    method: req.method,
    url: apiUrl,
    headers: {
      ...req.headers,
      // Add any additional headers needed for the API server
    },
    data: req.method !== 'GET' ? req.body : undefined,
  })
  .then(response => {
    res.status(response.status).json(response.data);
  })
  .catch(error => {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error' });
  });
});

// Routes
// User routes
app.use("/api/v1/users", require("./backend/routes/userroute"));
// Transaction routes
app.use("/api/v1/transactions", require("./backend/routes/transactionRoute"));

// Serving static files
app.use(express.static(path.join(__dirname, "./build")));

// Handling all other routes
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// Port configuration
const PORT = process.env.PORT || 8090;

// Listening to the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
