// backend/routes/analyticsRoutes.js
// backend/routes/analyticsRoutes.js
import express from "express";
import { ensureAuth } from "../middleware/auth.js";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

// Protected analytics route
router.get("/", ensureAuth, getAnalytics);

export default router;
