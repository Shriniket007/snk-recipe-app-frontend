import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate(); //for redirecting to home after login

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "https://dull-plum-angler-cap.cyclic.app/auth/login",
        {
          username,
          password,
        }
      );

      setCookies("access_token", result.data.token); //storin the token sent into access_token
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="showcase-form-A card">
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <div className="form-control">
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault(); //submit without refreshing the page

    try {
      await axios.post(
        "https://dull-plum-angler-cap.cyclic.app/auth/register",
        {
          username,
          password,
        }
      );
      alert("Registration complete! Now you have to login.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="showcase-form-A card">
      <form onSubmit={onSubmit}>
        <h2>Register</h2>
        <div className="form-control">
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Auth;
