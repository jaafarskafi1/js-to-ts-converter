const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoMemoryServer } = require("mongodb-memory-server");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
app.use(cors());

app.use(express.json());
app.use("/api", userRoutes);

// Set up in-memory MongoDB server
const mongoServer = new MongoMemoryServer();

async function startServer() {
  try {
    await mongoServer.start();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to in-memory MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
  }
}

startServer();