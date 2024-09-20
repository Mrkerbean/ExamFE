// app/page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';
console.log('API URL:', API_URL);
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('NODE_ENV:', process.env.NODE_ENV)
export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);

  const getRandomRecipe = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/recipes/random`);
      setRecipes([res.data]);
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    }
    setLoading(false);
  };

  const filterRecipes = async (e) => {
    e.preventDefault(); // Add this line to prevent form submission
    setLoading(true);
    const ingredientList = ingredients.split(',').map(i => i.trim());
    console.log('Filtering with ingredients:', ingredientList); // Debug log
    try {
      const res = await axios.post(`${API_URL}/api/recipes/filter`, { ingredients: ingredientList });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
      <main className="container mx-auto px-4 py-8 max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-900 mb-10">
          Recipe Randomizer
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button 
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              onClick={getRandomRecipe}
            >
              Get Random Recipe
            </button>
            <div className="flex-1 flex">
              <input 
                type="text" 
                value={ingredients} 
                onChange={(e) => setIngredients(e.target.value)} 
                placeholder="Enter ingredients, separated by commas"
                className="flex-grow border-2 border-gray-300 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button 
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={filterRecipes}
              >
                Filter
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-indigo-900 mb-4">{recipe.name}</h2>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Ingredients:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Instructions:</h3>
                    <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}