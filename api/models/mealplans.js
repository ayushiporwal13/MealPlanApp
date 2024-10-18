import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    week: {
        type: Number,
        required: true
    },
    meals: {
        type: [
            {
                meal_id: {
                    type:Number,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                diets: {
                    type: [String],
                    required: true
                },
                image: {
                    type: String,
                    required: true
                }
            }
        ],
        default: []
    }
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

export default MealPlan;