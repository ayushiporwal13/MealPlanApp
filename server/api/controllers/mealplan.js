import MealPlan from "../models/mealplan.js";

const addMealPlan = async (req, res) => {
  try {
    const { user_id } = req.verified;
    const { week, meal } = req.body;


    if (!user_id) {
      return res.status(403).json({ error: 'Forbidden user' });
    }

    const mealPlan = new MealPlan({
      user_id: user_id,
      week: week,
      meals: meal,
      isNew: true
    });

    const existingMealPlan = await MealPlan.findOne({ user_id, week });
    if(existingMealPlan){
      existingMealPlan.length + meal.length 
      await existingMealPlan.validate();
      mealPlan.isNew = false;
    }

    if (mealPlan.isNew) {
      await MealPlan.create(mealPlan);
      console.log("New meal plan saved.");
    } else {
      await MealPlan.findByIdAndUpdate(existingMealPlan._id, { $addToSet: { meals: { $each: mealPlan.meals } } });
      console.log("Meal plan updated with new meals.");
    }

    res.json({ message: "MealPlan addedd successfully" , mealPlan: mealPlan });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const { user_id } = req.verified;
    const mealPlanId = req.params.id;

    const mealPlan = await MealPlan.findOne({_id: mealPlanId, user_id : user_id});

    if (!mealPlan) {
      return res.status(404).json({ error: "Meal plan not found or Meal Plan does not belong to the user" });
    }

    await MealPlan.findByIdAndDelete(mealPlanId);

    return res.json({mealPlanId: mealPlanId, message: "Meal plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
export default { addMealPlan, deleteMealPlan };