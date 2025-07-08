require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// יצירת אפליקציה של Express
const app = express();


const allowedOrigins = [
  'https://phyiscal-eitan.vercel.app',
  'https://physical-eitan.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') || // 🟢 הוספת כלל גנרי
      origin.endsWith('.app.github.dev')
    ) {
      console.log("✅ CORS allowed for:", origin);
      callback(null, true);
    } else {
      console.log("❌ CORS blocked for:", origin);
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
}));
app.use(express.json());

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
