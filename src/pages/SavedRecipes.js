import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://dull-plum-angler-cap.cyclic.app/recipes/savedRecipes/${userID}`
        );
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

      <div className="products sec">
        {savedRecipes.map((recipe) => (
          <div className="card" key={recipe._id}>
            <div className="img">
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <div className="desc">
              <p> cooking Time: {recipe.cookingTime} (minutes)</p>
            </div>
            <div className="title">{recipe.name}</div>
            <div className="price">
              <p>{recipe.instructions}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
