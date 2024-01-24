import express from "express";
import "./config/db.mjs"; // Loads .env file into process.env
import connectDB from "./config/db.mjs";
import corsOptions from "./config/corsOptions.mjs";
import cors from "cors";
import requestLoggerMiddleware from "./config/request-logger-middleware.mjs";
import logger from "./config/logger.mjs";
import bodyParser from "body-parser";
import userRoutes from './routes/userRoutes.js';





const app = express();

connectDB();

// Middlewares
app.use(express.json()); // parses JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // parses urlencoded bodies (form data)
app.use(cors(corsOptions));

app.use('/public', express.static('public')); // Serve static files



// Use request logging middleware
app.use(requestLoggerMiddleware);


// Error handling middleware, always at the end of the middleware stack
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send('Something went wrong.');
});


// Define your routes here...
app.get("/", (req, res) => {
  res.send("Hello from the MERN backend!");
});
app.use('/api/users', userRoutes);




// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started @ http://localhost:${PORT}`);
});
