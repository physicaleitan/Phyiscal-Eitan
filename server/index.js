require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");
const cors = require("cors");

const app = express();

app.set('trust proxy', 1);

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
      origin.endsWith('.vercel.app') ||
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

// ✅ Connect to MongoDB at app start
connectDB();

// ✅ Define routes after DB connection
const questionRoutes = require("./routes/questionRoutes");
app.use("/api/questions", questionRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const subjectRoutes = require("./routes/subjectRoutes");
app.use("/api/subjects", subjectRoutes);

module.exports = app;
