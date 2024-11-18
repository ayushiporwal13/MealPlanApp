import MealPlan from "../models/mealplan.js";

const addMealPlan = async (req, res) => {
  try {
    const { user_id } = req.verified;
    const { week, meal } = req.body;

    // need to confirm whether to include this or not?
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
    console.log('existingMealPlan', existingMealPlan);
    if(existingMealPlan){
      console.log('inside if');
      existingMealPlan.length + meal.length 
      await existingMealPlan.validate();
      mealPlan._id = existingMealPlan._id;
      mealPlan.isNew = false;
    }

    console.log('mealPlan', mealPlan);

    await mealPlan.save();

    console.log('mealPlan after save', mealPlan);
    // let mealPlan = await MealPlan.findOne({ user_id: user_id, week: week });

    res.json({ message: "MealPlan addedd successfully" , mealPlan: mealPlan });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const { user_id } = req.verified;
    const mealPlanId = req.params.id;
    // const id  = req.headers.user_id;

    const mealPlan = await MealPlan.findOne({_id: mealPlanId, user_id : user_id});
    console.log('mealPlan', mealPlan);

    if (!mealPlan) {
      return res.status(404).json({ error: "Meal plan not found or Meal Plan does not belong to the user" });
    }

    // use the deleteOne method to remove the meal plan
    await mealPlan.deleteOne();

    return res.json({mealPlanId: mealPlanId, message: "Meal plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
export default { addMealPlan, deleteMealPlan };