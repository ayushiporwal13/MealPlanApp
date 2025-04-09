/* eslint-disable no-undef */
import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoDB from "./db/connection.js";

import meals from "./api/routes/meal.js";
import users from "./api/routes/user.js";
import mealplans from "./api/routes/mealplan.js";

const app = express();
const PORT = process.env.PORT || 3000;

const options = {exposedHeader: ["Authorization"]};
app.use(cors(options));
// app.use(cors());

app.use(express.json());

app.use("/meals", meals);
app.use("/users", users);
app.use("/mealplans", mealplans);

app.listen(PORT, async () => {
    // connecting to mongo db before starting the server
    await mongoDB.connect();

    console.log(`Server is running on port ${PORT}`);
})