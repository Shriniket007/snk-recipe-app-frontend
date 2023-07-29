import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import SavedRecipes from "./pages/SavedRecipes";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// npm install react-router-dom axios react-cookie
