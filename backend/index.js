import path from "path";
import { fileURLToPath } from "url";
//import axios from "axios";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routerAPI from "./routes/api.js";
import userController from "./controllers/userController.js";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 8080;
const SALT_WORK_FACTOR = 10;

//const apiPath = path.join(__dirname, "/routes/api.js");
//const routerAPI = require(apiPath);


// this fixes the issue with ES modules: passes __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware

app.use(express.json());
app.use(cookieParser());

// CORS middleware options
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// route handler for requests to /api
app.use("/api", routerAPI);



// Unknown route handler

app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log("errorObj.log: ", errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
