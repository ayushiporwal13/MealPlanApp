/* eslint-disable no-undef */
import express from "express";
import MealsController from "../controllers/meal.js";
import { verifyUser } from "../middleware/authorizations.js";

const router = express.Router();

// GET /meals/search
router.get("/search", verifyUser, MealsController.searchMeals);
router.get("/preferences", MealsController.fetchPreferences);

export default router;