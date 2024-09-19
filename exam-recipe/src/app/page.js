// app/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);

  const getRandomRecipe = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/recipes/random');
      setRecipes([res.data]);
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    }
    setLoading(false);
  };

  const filterRecipes = async () => {
    setLoading(true);
    const ingredientList = ingredients.split(',').map(i => i.trim());
    console.log('Filtering with ingredients:', ingredientList); // Debug log
    try {
      const res = await axios.post('http://localhost:5000/api/recipes/filter', { ingredients: ingredientList });
      console.log('Filter response:', res.data); // Debug log
      setRecipes(res.data);
    } catch (error) {
      console.error('Error filtering recipes:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRandomRecipe();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipe Randomizer</h1>
      <div className="mb-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={getRandomRecipe}
        >
          Get Random Recipe
        </button>
        <input 
          type="text" 
          value={ingredients} 
          onChange={(e) => setIngredients(e.target.value)} 
          placeholder="Enter ingredients, separated by commas"
          className="border p-2 rounded"
        />
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={filterRecipes}
        >
          Filter Recipes
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {recipes.map((recipe, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h2 className="text-2xl font-bold">{recipe.name}</h2>
              <h3 className="text-xl font-semibold mt-2">Ingredients:</h3>
              <ul className="list-disc pl-5">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mt-2">Instructions:</h3>
              <p>{recipe.instructions}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}