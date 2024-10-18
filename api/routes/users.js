// import axios from 'axios';

import express from "express";
import { Users, MealPlans } from "../../db/mocks.js";
import { hash, compare, signToken, verifyToken } from "../util/auth.js";

const router = express.Router();

//POST /users/register
router.post("/register", async (req, res) => {
  try {
    const { username, password, preferences } = req.body;

    if (!username || !password) {
      return res
        .status(422)
        .json({ error: "Must provide both username and password." });
    }

    const isRegistered = Users.find("username", username.toLowerCase());
    if (isRegistered) {
      return res.status(409).json({ error: "User already registerd." });
    }

    //hash the user password
    const hashedPassword = await hash(password);

    const user = Users.add({
      username: username.toLowerCase(),
      password: hashedPassword,
      preferences: preferences,
    });

    res.json({
      _id: user._id,
      username: user.username,
      preferences: user.preferences,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// POST /users/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // just for saving real world time, not for security
    if (!username || !password) {
      return res
        .status(422)
        .json({ error: "Must provide both username and password." });
    }

    const user = Users.find("username", username.toLowerCase());
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // if (!user || user.password !== password){
    //     return res.status(401).json({ error : "Invalid username or password"});
    // }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // generate token
    const token = signToken({ username: user.username, user_id: user._id });

    res.json({
      _id: user._id,
      username: user.username,
      preferences: user.preferences,
      access_token: token,
      token_type: "Bearer",
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// GET /users/:id
router.get("/:id", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params; //user_id - for logged in user
    const { week } = req.query;
    const { user_id } = req.headers;

    const token = authorization.split(' ').pop();

    const verified = verifyToken(token);
    console.log(verified);

    if (id !== user_id) {
      return res.status(403).json({ error: "Forbidden user." });
    }
    const user = Users.find("_id", parseInt(id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (week) {
      const mealPlan = MealPlans.find(parseInt(user._id), parseInt(week));
      res.json({ user: user.username, mealPlan: mealPlan.meals });
    } else {
      const mealPlan = MealPlans.findAll(parseInt(user._id));
      res.json({ user: user.username, mealPlan: mealPlan });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// PUT /users/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.headers;
    const { preferences } = req.body;

    if (id !== user_id) {
      return res.status(403).json({ error: "Forbidden user." });
    }

    const user = Users.find("_id", parseInt(id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = Users.update(user._id, preferences);

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      preferences: updatedUser.preferences,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
