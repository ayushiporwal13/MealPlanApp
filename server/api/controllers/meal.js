/* eslint-disable no-undef */
import axios from "axios";
import User from "../models/user.js";

const API_KEY = process.env.S_API_KEY;
const BASE_URL = process.env.S_BASE_URL;
const DIETS = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
];

const searchMeals = async (req, res) => {
  try {
    const meal = req.query.query;
    const { diets } = req.query;
    const { user_id } = req.verified;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userDiets = diets
      ? diets
          .split(",")
          .filter((diet) => DIETS.includes(diet))
          .join(",")
      : user.preferences
          .filter((preference) => DIETS.includes(preference))
          .join(",");

    const meals = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        query: meal,
        diet: userDiets,
        apiKey: API_KEY,
        addRecipeInformation: true,
      },
    });

    if (!meals.data.results || meals.data.results.length === 0) {
      return res.status(404).json({ error: "No meals found for the given query." });
    }

    res.json(meals.data.results);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default { searchMeals };
