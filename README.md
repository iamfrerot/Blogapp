# Blog App

## Description
Blog App is a web application designed for creating, managing, and viewing blog posts. It leverages Node.js and Express for the backend, MongoDB for data storage, and EJS for templating views. This application is structured to be simple, yet flexible enough to extend for additional features in the future.

## Features
- User authentication using `bcrypt` and `jsonwebtoken`.
- Blog Management `create`, `read`, `updated` and `delete`
- Session management with `express-session` and `connect-mongo`.
- Server-side templating using EJS and `express-ejs-layouts`.
- Environment variable management with `dotenv`.
- Middleware for advanced HTTP request handling using `method-override`.
- Cookie parsing for handling cookies with `cookie-parser`.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16 or higher recommended)
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/iamfrerot/blog-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the project root directory and configure the required environment variables:
   ```env
   PORT=3000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   SESSION_SECRET=your-session-secret
   ```

### Running the Application
- To start the application in production mode:
  ```bash
  npm start
  ```
- To run the application in development mode with live-reloading:
  ```bash
  npm run dev
  ```

The application will be accessible at `http://localhost:3000`.

## Scripts
- `npm start`: Starts the application.
- `npm run dev`: Starts the application in development mode with `nodemon`.
- `npm test`: Placeholder for test scripts.

## Project Structure
```
blog-app/
├── app.js             # Main application entry point
├── views/             # EJS templates
├── server/            # Application routes, db config and models
├── public/            # Static files (CSS, JS, images)
├── .env               # Environment variables
├── .gitignore         # ignore enviroment variables
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

## Dependencies
### Main Dependencies
- **bcrypt**: For hashing passwords.
- **connect-mongo**: MongoDB session store for `express-session`.
- **cookie-parser**: Parses cookies in requests.
- **dotenv**: Loads environment variables from a `.env` file.
- **ejs**: Embedded JavaScript templating.
- **express**: Web framework for Node.js.
- **express-ejs-layouts**: Layout support for EJS templates.
- **express-session**: Session middleware for Express.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **method-override**: Enables support for HTTP methods like PUT and DELETE.
- **mongoose**: MongoDB object modeling tool.

### Development Dependencies
- **nodemon**: Utility for auto-restarting the application during development.
