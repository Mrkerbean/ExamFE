# Recipe Randomizer

A web application that allows users to get random recipes or filter recipes by ingredients.

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd exam-recipe
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the backend:
   - Ensure you have a backend server running on `http://localhost:5000` with the following API endpoints:
     - GET `/api/recipes/random`: Returns a random recipe
     - POST `/api/recipes/filter`: Accepts a list of ingredients and returns matching recipes

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

- Click "Get Random Recipe" to fetch and display a random recipe
- Enter ingredients (comma-separated) and click "Filter Recipes" to find recipes with those ingredients

## Technologies Used

- Next.js
- React
- Axios for API requests
- Tailwind CSS for styling

## Note

This project assumes a backend API is available. Make sure to set up and run the backend server before using this application.
