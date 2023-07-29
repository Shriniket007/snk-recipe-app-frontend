import axios from "axios";
import React, { useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./CreateRecipe.css";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target; //for grabbing the name value from the input
    setRecipe({ ...recipe, [name]: value }); //we use the spread operator to keep recipe obj same as before and just updating the name field with the value we enter //so for name=name it will beupdated with the value we enter and for name = imageUrl it will be updated with the value we enter
  };

  //for changing the value of the ingredient which is already added //empty input
  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  //for adding an extra input field we set the recipe as before but add a empty " " to the ingredients array
  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://dull-plum-angler-cap.cyclic.app/recipes",
        recipe,
        {
          headers: { Authorization: cookies.access_token },
        }
      );
      alert("Recipe created");
      navigate("/"); //for redirecting to the home page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="c-recipe">
      <div className="showcase-form-R card">
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit}>
          {/* <label htmlFor="name">Name</label> */}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="form-control"
            onChange={handleChange}
          />

          {/* <label htmlFor="ingredients">Ingredients</label> */}
          {recipe.ingredients.map((ingredient, idx) => (
            <input
              key={idx}
              type="text"
              className="form-control"
              name="ingredients"
              placeholder="Ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, idx)}
            />
          ))}
          <button
            onClick={addIngredient}
            type="button"
            className="btn btn-primary"
          >
            Add Ingredient
          </button>

          {/* <label htmlFor="instructions">Instructions</label> */}
          <textarea
            name="instructions"
            id="instructions"
            className="form-control"
            placeholder="Instructions"
            onChange={handleChange}
          ></textarea>

          {/* <label htmlFor="imageUrl">Image URL</label> */}
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="Image URL"
            className="form-control"
            onChange={handleChange}
          />

          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            className="form-control"
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
