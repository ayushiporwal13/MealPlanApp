import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      set: (username) => username.toLowerCase(),
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    preferences: {
      type: [String],
      default: [],
    },
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

// virtual to populate the associated mealplans for the user
userSchema.virtual("user_mealplans", {
  ref: "MealPlan",
  localField: "_id",
  foreignField: "user_id",
});

const User = mongoose.model("User", userSchema);

export default User;
