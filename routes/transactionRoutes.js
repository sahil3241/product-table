import express from "express";
import {
  getAllTransactions,
  initializeDatabase,
  checkDatabaseStatus,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/initialize-database", initializeDatabase);

router.get("/", getAllTransactions);

router.get("/database-status", checkDatabaseStatus);

export default router;
