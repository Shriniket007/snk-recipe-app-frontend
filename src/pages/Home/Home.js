import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import "./Home.css";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "https://dull-plum-angler-cap.cyclic.app/recipes"
        );
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://dull-plum-angler-cap.cyclic.app/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();

    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://dull-plum-angler-cap.cyclic.app/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { Authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id); //return a boolean

  return (
    <div>
      <h1 className="r-head">Recipes</h1>
      <div className="sec">
        <div className="products">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="card">
              <div className="img">
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
              <div className="desc">
                <p> cooking Time: {recipe.cookingTime} (minutes)</p>
              </div>
              <div className="title">{recipe.name}</div>

              <div className="box">
                <div className="price">
                  <p>{recipe.instructions}</p>
                </div>{" "}
                <button
                  className="btn"
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

// https://dull-plum-angler-cap.cyclic.app
