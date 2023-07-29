import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import "./Home.css";

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
        "/recipes",
        { recipeID, userID },
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
        <div class="products">
          {recipes.map((recipe) => (
            <div key={recipe._id} class="card">
              <div class="img">
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
              <div class="desc">
                <p> cooking Time: {recipe.cookingTime} (minutes)</p>
              </div>
              <div class="title">{recipe.name}</div>

              <div class="box">
                <div class="price">
                  <p>{recipe.instructions}</p>
                </div>{" "}
                <button
                  class="btn"
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}{" "}
                </button>
              </div>

              {/* <h2>{recipe.name}</h2> */}
              {/* <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}{" "}
              </button> */}
              {/* 
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div> */}

              {/* <img src={recipe.imageUrl} alt={recipe.name} /> */}

              {/* <p>cooking Time: {recipe.cookingTime} (minutes)</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

<section class="sec">
  <div class="products">
    <div class="card">
      <div class="img">
        <img src="" alt="" />
      </div>
      <div class="desc">Women</div>
      <div class="title">Lady sandal</div>
      <div class="box">
        <div class="price">$50</div>
        <div class="btn">Buy now</div>
      </div>
    </div>
  </div>
</section>;
