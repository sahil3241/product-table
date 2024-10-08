import express from "express";
import {
  getBarChartData,
  getPieChartData,
} from "../controllers/chartController.js";

const router = express.Router();

router.get("/bar", getBarChartData);
router.get("/pie", getPieChartData);

export default router;
