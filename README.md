# Meal Plan App

Welcome to the **Meal Plan App**! This application is designed to help users plan their meals efficiently, track their dietary preferences, and simplify their grocery shopping experience.

## Deployed Application
You can access the live version of the app here: [Meal Plan App](https://meal-plan-app-swart.vercel.app/account)

## Features
- **User Authentication**: Secure login and account management.
- **Meal Planning**: Create, edit, and manage weekly meal plans.
- **Recipe Search**: Search for recipes based on ingredients or dietary preferences.
- **Dietary Preferences**: Customize meal plans to accommodate dietary restrictions or preferences.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.

## Technologies Used
- **Frontend**: Svelte.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel, Render

## Installation and Setup
To run the app locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ayushiporwal13/MealPlanApp.git
    2. Navigate to the project directory:
        ```bash
        cd MealPlanApp
        ```
    3. Install dependencies for both the client and server:
        ```bash
        cd client
        npm install
        cd ../server
        npm install
        cd ..
        ```
    4. Set up environment variables for the server:
        - Navigate to the `server` directory.
        - Create a `.env` file in the `server` directory.
        - Add the following variables:
          ```
          MONGO_URI=your_mongodb_connection_string
          JWT_SECRET=your_jwt_secret
          ```
    5. Start the development servers:
        - Start the client:
          ```bash
          cd client
          npm run dev
          ```
        - Start the server:
          ```bash
          cd ../server
          npm run start
          ```
    6. Open your browser and navigate to `http://localhost:5173` for the client.

## Folder Structure
- **/client**: Contains the frontend code built with Svelte.js, including components, pages, and styles.
- **/server**: Contains the backend code, including API routes and server-side logic.

## Future Enhancements
- Integration with third-party APIs for recipe suggestions.
- Advanced analytics for tracking nutritional intake.
- Social sharing features for meal plans.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

        Copyright [2025] [Ayushi Porwal]

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.

---

Thank you for visiting the Meal Plan App! If you have any questions or feedback, feel free to reach out.