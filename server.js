import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from './backend/routes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"], credentials: true }));
app.use(express.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
