import express from "express";
import { getCombinedData } from "../controllers/combinedController.js";

const router = express.Router();

router.get("/", getCombinedData);

export default router;
