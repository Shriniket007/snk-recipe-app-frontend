import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "boxicons/css/boxicons.min.css";

const Navbar = () => {
  //responsive
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  //working
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", ""); //setting the acces_token to be empty (after logout)
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="header">
      <Link href="#home" className="logo">
        Portfolio
      </Link>

      <i
        onClick={handleMenuClick}
        className={isMenuOpen ? "bx bx-x" : "bx bx-menu"}
        id="menu-icon"
      ></i>

      <nav className={isMenuOpen ? "navbar active" : "navbar"}>
        <Link to={"/"}>Home</Link>
        <Link to={"/create-recipe"}> Create Recipe</Link>

        {!cookies.access_token ? (
          <Link to={"/auth"}> Login/Register</Link>
        ) : (
          <>
            <Link to={"/saved-recipes"}> SavedRecipes</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
