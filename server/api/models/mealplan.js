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
        console.log('I am in pre validate');
        const user_id = this.user_id;
        const isNew = this.isNew;

        // if (isNew) {
        //     return next();
        // }

        const User = mongoose.model("User");
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error("No user found");
        }

        console.log('this.meals.length', this.meals.length);
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

mealPlanSchema.pre("save", async function(next) {
    try {
        console.log('I am in pre save');
        // console.log("this:", this);
        // console.log("this._id:", this._id);
        // console.log("this.meals:", this.meals);
        const mealPlanId = this._id;
        const meals = this.meals;
        // console.log("mealPlanId:", mealPlanId);

        // if (!this.isNew) {
            await MealPlan.findByIdAndUpdate(mealPlanId, { $addToSet: { meals: meals } });
            console.log("Meal plan updated with new meals.");
        // } else {
            // await MealPlan.create(this);
            // console.log("Meal plan created.");
        // }

        
    } catch (error) {
        next(error);
    }
});

mealPlanSchema.post("deleteOne", {document: true}, async function() {
    try{
        const mealPlanId = this.mealPlanId;
        console.log("mealPlanId:", mealPlanId);

        const MealPlan = mongoose.model("MealPlan");
        await MealPlan.findByIdAndDelete(mealPlanId);
    } catch(error) {
        console.error(`Error deleting meal plan: ${error}`);
    }
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

export default MealPlan;


