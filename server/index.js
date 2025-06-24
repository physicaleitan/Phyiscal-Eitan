require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// יצירת אפליקציה של Express
const app = express();


const allowedOrigins = [
  'https://phyiscal-eitan.vercel.app', // פרונט בפרודקשן
  'http://localhost:3000'              // פיתוח מקומי
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// הגדרת נתיבי API
const questionRoutes = require("./routes/questionRoutes");
app.use("/api/questions", questionRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const subjectRoutes = require("./routes/subjectRoutes");
app.use("/api/subjects", subjectRoutes);




// הפעלת השרת
module.exports = app;