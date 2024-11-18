import express from "express";
import MealPlanController from "../controllers/mealplan.js";
import { verifyUser } from "../middleware/authorizations.js";

const router = express.Router();

// POST /mealplans
router.post("/", verifyUser, MealPlanController.addMealPlan);

// DELETE /mealplans/:id
router.delete("/:id", verifyUser, MealPlanController.deleteMealPlan);

export default router;
