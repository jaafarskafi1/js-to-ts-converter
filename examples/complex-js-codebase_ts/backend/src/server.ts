import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MongoMemoryServer } from "mongodb-memory-server";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;

// Enable CORS
app.use(cors());

app.use(express.json());
app.use("/api", userRoutes);

// Set up in-memory MongoDB server
const mongoServer = new MongoMemoryServer();

async function startServer(): Promise<void> {
  try {
    await mongoServer.start();
    const mongoUri: string = mongoServer.getUri();
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