import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

mealPlanSchema.pre("validate", async function(next) {
    try {
        const user_id = this.user_id;
        const isNew = this.isNew;

        const User = mongoose.model("User");
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error("No user found");
        }

        if(isNew && this.meals.length === 3) {
            next();
        }
        if (this.meals.length >= 3) {
            throw new Error("Meal plan already contains 3 meals, no more can be added.");
        } 

        next();
    } catch (error) {
        next(error);
    }
});

// mealPlanSchema.pre("save", async function(next) {
//     try {
//         const mealPlanId = this._id;
//         const meals = this.meals;

//         // if (!this.isNew) {
//             await MealPlan.findByIdAndUpdate(mealPlanId, { $addToSet: { meals: meals } });
//             console.log("Meal plan updated with new meals.");
//         // } else {
//             // await MealPlan.create(this);
//             // console.log("Meal plan created.");
//         // }
//     } catch (error) {
//         next(error);
//     }
// });

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

export default MealPlan;


