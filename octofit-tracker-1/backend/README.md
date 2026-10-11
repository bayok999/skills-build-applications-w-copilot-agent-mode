# Octofit Tracker Backend

## Overview

The Octofit Tracker backend is a multi-tier application built using Node.js, Express, and TypeScript. It serves as the logic tier for the Octofit Tracker project, handling user authentication, activity logging, team management, and more.

## Project Structure

The backend is organized into the following directories:

- **src/**: Contains the source code for the application.
  - **app.ts**: Entry point of the application, where the Express app is instantiated and middleware/routes are set up.
  - **config/**: Configuration files, including database connection settings.
  - **controllers/**: Contains controllers that handle user and activity operations.
  - **middleware/**: Middleware functions, including authentication checks.
  - **models/**: Mongoose models for interacting with the database.
  - **routes/**: Defines application routes and associates them with controllers.
  - **services/**: Business logic services for data processing and retrieval.
  - **types/**: Type definitions used throughout the application.
  - **utils/**: Utility functions for common tasks.

## Setup Instructions

1. **Install Dependencies**: Navigate to the backend directory and run:
   ```
   npm install
   ```

2. **Configure Database**: Update the database connection settings in `src/config/db.ts` with your MongoDB credentials.

3. **Run the Application**: Start the server using:
   ```
   npm start
   ```

4. **Check MongoDB Status**: Ensure that the MongoDB service is running by executing:
   ```
   ps aux | grep mongod
   ```

## API Endpoints

The backend exposes various API endpoints for user and activity management. Refer to the routes defined in `src/routes/index.ts` for detailed information on available endpoints.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.