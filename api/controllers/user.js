import User from "../models/user.js";
import { hash, compare, signToken } from "../util/auth.js";

const registerUser = async (req, res) => {
  try {
    const { username, password, preferences } = req.body;

    // ensure both username and password are provided
    if (!username || !password) {
      return res
        .status(422)
        .json({ error: "Must provide both username and password." });
    }

    // not needed because of unique constraint in the schema
    // const isRegistered = Users.find("username", username.toLowerCase());
    // if (isRegistered) {
    //   return res.status(409).json({ error: "User already registerd." });
    // }

    //hash the user password
    const hashedPassword = await hash(password);

    const userEntry = await User.create({
      username,
      password: hashedPassword,
      preferences: preferences,
    });

    res.json({
      _id: userEntry._id,
      username: userEntry.username,
      preferences: userEntry.preferences,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // just for saving real world time, not for security
    // ensure both username and password are in req.body
    if (!username || !password) {
      return res
        .status(422)
        .json({ error: "Must provide both username and password." });
    }

    // find user by username
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // verify password
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // generate token
    const token = signToken(user.username, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      preferences: user.preferences,
      token_type: "Bearer",
      access_token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getUserMealPlanById = async (req, res) => {
  try {
    const { user_id } = req.verified;
    const { id } = req.params; //user_id - for logged in user
    const week = Number(req.query.week);

    // ensure the guest id in header matches id provided in URL
    if (id !== user_id) {
      return res.status(403).json({ error: "Forbidden user." });
    }

    const userWithMealPlan = await User.findById(id)
      .select("-password")
      .populate({ path: "user_mealplans" });

    if (!userWithMealPlan) {
      return res.status(404).json({ error: "User not found" });
    }

    if (week) {
      const mealPlan = userWithMealPlan.user_mealplans.find(
        (mp) => mp.week === week
      );
      if (!mealPlan) {
        return res
          .status(404)
          .json({ error: `No meal plan found for week ${week}` });
      }
      return res.json({
        _id: userWithMealPlan._id,
        username: userWithMealPlan.username,
        preferences: userWithMealPlan.preferences,
        mealPlan: mealPlan,
      });
    }

    res.json({ userWithMealPlan });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.verified;
    const { preferences } = req.body;

    if (id !== user_id) {
      return res.status(403).json({ error: "Forbidden user." });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { preferences },
      { new: true }
    ).select("-password");

    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default { registerUser, loginUser, getUserMealPlanById, updateUser };
