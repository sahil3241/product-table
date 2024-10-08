import express from "express";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import statisticsRoutes from "./routes/statisticsRoutes.js";
import chartRoutes from "./routes/chartRoutes.js";
import combinedRoutes from "./routes/combinedRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import cors from "cors";
import { initializeDatabase } from "./controllers/transactionController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/transactions", transactionRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/charts", chartRoutes);
app.use("/api/combined", combinedRoutes);

app.use(errorHandler);

initializeDatabase();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
