const Users = {
  users: [
    {
      _id: 1,
      username: "ayushi",
      password: "968dfbd2b93f69d0054de23ba5ae09ca:41bfdba571e9b788b3f890414c5cd42b9fc386e54dbfc1245669e5a360158754", //password
      preferences: ["Lacto-Vegetarian", "Vegan", "Vegetarian"],
    },
  ],

  // find(userId) {
  //   return this.users.find((user) => user._id === userId);
  // },

  find(key, value) {
    // find a user by matching a specified key and value
    return this.users.find((user) => user[key] === value);
},

  add(user) {
    // create a new _id based on the current user.length + 1
    const addUser = { ...user, _id: this.users.length + 1 };
    this.users.push(addUser);

    return addUser;
  },

  update(userId, preferences) {
    const user = this.find("_id", userId);

    if (!user) {
      return null;
    }

    user.preferences = preferences;
    return user;
  },
};

const MealPlans = {
  mealPlans: [
    {
      _id: 1,
      user_id: 1,
      week: 1,
      meals: [
        {
          meal_id: 660101,
          name: "Simple Garlic Pasta",
          diets: ["dairy free", "lacto ovo vegetarian", "vegan"],
          image: "https://img.spoonacular.com/recipes/660101-312x231.jpg",
        },
        {
          meal_id: 1096227,
          name: "Pesto Zucchini Pasta (Whole 30 Approved)",
          diets: [
            "gluten free",
            "dairy free",
            "paleolithic",
            "lacto ovo vegetarian",
            "primal",
            "whole 30",
            "vegan",
          ],
          image: "https://img.spoonacular.com/recipes/1096227-312x231.jpg",
        },
        {
          meal_id: 652203,
          name: "Mock Mashed Potato with crispy onions and shallots",
          diets: ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"],
          image: "https://img.spoonacular.com/recipes/652203-312x231.jpg",
        },
      ],
    },
    {
      _id: 2,
      user_id: 1,
      week: 2,
      meals: [
        {
          meal_id: 660101,
          name: "Simple Garlic Pasta",
          diets: ["dairy free", "lacto ovo vegetarian", "vegan"],
          image: "https://img.spoonacular.com/recipes/660101-312x231.jpg",
        },
      ],
    },
  ],



  findAll(userId) {
    // find all meal plans associated to a user by user_id
    return this.mealPlans.filter((mealPlan) => mealPlan.user_id === userId);
},

  find(userId, week) {
    // find a meal plan by user_id and week
    return this.mealPlans.find((mealPlan) => mealPlan.user_id === userId && mealPlan.week === week);
  },

  add(mealPlan, mealPlanId) {
    // if mealPlanId is provided then we find the existing meal plan and add a meal
    if (mealPlanId) {
      const idx = this.mealPlans.findIndex(
        (mealPlan) => mealPlan._id === mealPlanId
      );

      this.mealPlans[idx].meals.push(mealPlan.meal);
      return this.mealPlans[idx];
    }

    // if no mealPlanId is provided then we know we need to create a new meal plan with the meal
    const addMealPlan = {
      _id: this.mealPlans.length + 1,
      user_id: mealPlan.user_id,
      week: mealPlan.week,
      meals: [mealPlan.meal],
    };
    this.mealPlans.push(addMealPlan);

    return addMealPlan;
  },

  delete(mealplanId) {
    this.mealPlans = this.mealPlans.filter((mealPlan) => mealPlan._id !== mealplanId);

    return mealplanId;
}
};

export { Users, MealPlans };
