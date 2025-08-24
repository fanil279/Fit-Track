Fitness Goal Tracker App


●	Basic documentation 

## About the App
The **Fitness Goal Tracker App** is a web-based full-stack application that helps users track their fitness goals. Users can create, update, and delete their fitness goals, making it easier for them to stay on track with their health and wellness journey. The app features goal management, goal descriptions, and user authentication. App supports two languages and form input when registering is validated. Built using **Node.js**, **Express**, **MongoDB Atlas**, and **Bootstrap** for the front-end, it offers a responsive and user-friendly experience. The app was hosted on the Railway platform.


## Step-by-Step Instructions to Run the App Locally
Follow these steps to run the Fitness Tracker App locally on your machine:

1. **Clone the repository**
First, clone the project repository using the following command:
    - git clone https://github.com/fanil279/00018993.git

2. **Navigate into the project directory**
- cd Relative or Absolute path.

3. **Install dependencies**:
- Run the following command to install the required dependencies: npm i express mongoose bcryptjs cookie-parser express-validator i18n jsonwebtoken nodemon dotenv ejs.

4. **An `.env` file**:
- An `.env` file will not be pushed to git hub repository because of security concerns, but it will be submitted with the project to the intranet. MongoDB URI, SECRET_KEY and PORT are stalled there.

5. **Run the app**:
To start the app locally, run: npm start.


## Application Dependencies
Here is a list of the main dependencies used in the app:

- **express**: A fast, unopinionated, minimalist web framework for Node.js.
- **mongoose**: MongoDB object modeling for Node.js.
- **bcryptjs**: A library to hash and verify passwords securely.
- **cookie-parser**: Parse cookies in the request.
- **express-validator**: A set of middleware to validate and sanitize request data.
- **i18n**: Internationalization for Node.js, allowing the app to support multiple languages.
- **jsonwebtoken**: JSON Web Token implementation for authentication.
- **nodemon**: A tool that helps develop Node.js applications by automatically restarting the server when file changes are detected.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **ejs**: Embedded JavaScript templating engine, used to render HTML views dynamically.
- **bootstrap**: A front-end framework to make the app responsive and user-friendly. Not installed through npm but through a <link> tag.


## Links
- [GitHub Repository](https://github.com/fanil279/Fit-Track).



●	project structure

Although the recommended structure in the assignment brief is solid and suited for small- to medium-sized apps, I slightly restructured mine to better align with best practices for modern full-stack Express applications, especially those involving authentication, localization, and modular routing.

    controllers folder:
    Instead of grouping route handlers inside the /routes folder (as suggested), I separated controller logic into the /controllers folder (authController.js, goalController.js). This makes the codebase easier to navigate, especially as the project scales. Each controller handles the logic for its respective route.

    locales folder:
    I added a /locales directory with en.json and ru.json files for internationalization using the i18n package. It keeps translations cleanly separated from business logic and views.

    middleware folder:
    I created a /middleware directory to house authentication-related middleware (isAuth, isNotAuth) and utilities like i18n.js for localization and global errorHabdler. This makes the logic reusable and keeps app.js cleaner.

    models folder:
    I created a /models directory to separate and organize Mongoose schemas for User and Goal. This helps maintain clean MVC architecture and separates data modeling from logic.

    public folder:
    My /public folder contains /images, /styles, and /JavaScript, which maps exactly to the expected use (static assets for the client UI). I slightly renamed javascripts/ to JavaScript/ to keep it concise.

    routes folder:
    I kept the /routes folder, but used separate files like authRoutes.js, goalRoutes.js, and localesRoutes.js instead of users/index.js, etc., because this fits better with the actual structure of the app and route grouping.

    utils folder:
    The utils/validation.js file contains custom validation logic using express-validator, keeping it modular and away from controller code.

    views folder (with EJS):
    I used EJS, and structured views under /views, including a partials/ folder to reuse components like login and register forms.

My adjusted structure makes the application easier to understand, maintain, and extend — while still maintaining the core structure conventions and the recommended layout.