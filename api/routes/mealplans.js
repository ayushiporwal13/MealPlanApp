import express from "express";
import { Users, MealPlans } from "../../db/mocks.js";

const router = express.Router();

// POST /mealplans
router.post("/", async (req, res) => {
  try {
    const user_id = Number(req.headers.user_id);
    const { week, meal } = req.body;

    const user = Users.find('_id',user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let mealPlan = await MealPlans.find(user_id, week);

    if (!mealPlan) {
      mealPlan = MealPlans.add({
        user_id: user_id,
        week: week,
        meal: meal,
      });
    } else {
      if (mealPlan.meals.length >= 3) {
        return res
          .status(400)
          .json({
            error: "Meal plan already contains 3 meals, no more can be added.",
          });
      }

      mealPlan = MealPlans.add(
        {
          user_id: parseInt(user_id),
          week: week,
          meal: meal,
        },
        mealPlan._id
      );
    }

    res.json({ mealPlan: mealPlan });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// DELETE /mealplans/:id
router.delete("/:id", async (req, res) => {
  try {
    const user_id = Number(req.headers.user_id); 
    const mealPlanId = Number(req.params.id); 

    const mealPlan = MealPlans.mealPlans.find((mealPlan) => mealPlan._id === mealPlanId);

    if (!mealPlan) {
      return res.status(404).json({ error: "Meal plan not found" });
    }

    if (mealPlan.user_id !== user_id) {
      return res.status(403).json({ error: "Forbidden: Meal plan does not belong to the user" });
    }

    const deletedMealPlanId = MealPlans.delete(mealPlanId);
    return res.json({ deletedMealPlanId: deletedMealPlanId, message: "Meal plan deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});


export default router;
