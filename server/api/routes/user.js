import express from "express";
import UserController from "../controllers/user.js";
import { verifyUser } from "../middleware/authorizations.js";

const router = express.Router();

//POST /users/register
router.post("/register", UserController.registerUser);

// POST /users/login
router.post("/login", UserController.loginUser);

// GET /users/:id
router.get("/:id", verifyUser, UserController.getUserMealPlanById);

// PUT /users/:id
router.put("/:id", verifyUser, UserController.updateUser);

export default router;
