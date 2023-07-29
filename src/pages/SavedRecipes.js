import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`/savedRecipes/${userID}`);
        if (response?.data?.savedRecipes) {
          setSavedRecipes(response.data.savedRecipes);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div>
      <h1 className="r-head">Saved Recipes</h1>

      <div className="sec">
        <div class="products">
          {savedRecipes.map((recipe) => (
            <div key={recipe._id} class="card">
              <div class="img">
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
              <div class="desc">
                <p> cooking Time: {recipe.cookingTime} (minutes)</p>
              </div>
              <div class="title">{recipe.name}</div>
              <div class="price">
                <p>{recipe.instructions}</p>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
