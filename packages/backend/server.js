const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const profileRoute = require("./routes/profileRoute");
const skillRoute = require("./routes/skillRoute");
const categoryRoute = require("./routes/categoryRoute");
const resumeRoute = require("./routes/resumeRoute");
const path = require("path");
const uploadRoute = require("./routes/uploadRoute");


const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize the express app
const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: process.env.UI_WEB_URL, // Allow requests only from this origin (your frontend URL)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow only these methods (can be adjusted as needed)
    credentials: true, // Enable cookies if needed
  })
);

app.use(express.urlencoded({ extended: true })); // Important for form data

app.use("/faces", express.static(path.join(__dirname, "faces")));
app.use("/images", express.static(path.join(__dirname, "uploads")));



// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB URI in .env)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Use the auth routes
app.use("/auth", authRoutes);
app.use("/users", userRoute);
app.use("/profile", profileRoute);
app.use("/skills", skillRoute);
app.use("/categories", categoryRoute);
app.use("/resume", resumeRoute);
app.use("/upload", uploadRoute);


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${process.env.API_URL}`);
});
