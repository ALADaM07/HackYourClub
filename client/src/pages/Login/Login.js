import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLoading, performFetch, cancelFetch } = useFetch(
    "/auth/login",
    (response) => {
      const token = response.result.token;
      const user = response.result.user;

      if (response.result === "Incorrect Credentials!") {
        setMessage(
          "Incorrect credentials. Please check your email and password."
        );
      } else if (!response.result.token) {
        setMessage(
          "Incorrect credentials. Please check your email and password."
        );
      } else if (!user.isActive) {
        setMessage("No such user!");
      } else {
        if (token) {
          localStorage.setItem("token", token);
          setUser(user);
          navigate("/");
          setIsLoggedIn(true);
        }
      }
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    setMessage(null);
    try {
      performFetch({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      setMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="user-login">
      <div className="container">
        <h1>LOGIN</h1>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <fieldset>
            <div className="control-group">
              <label className="control-label" htmlFor="email">
                Email
              </label>
              <div className="controls">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="control-group">
              <label className="control-label" htmlFor="password">
                Password
              </label>
              <div className="controls">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <span>
              If you do not have an account,{" "}
              <Link style={{ textDecoration: "none" }} to="/signup">
                Signup here
              </Link>
            </span>
            <div className="control-group">
              <div className="controls">
                <button type="submit" className="btn btn-success ">
                  Login
                </button>
              </div>
            </div>
          </fieldset>
        </form>
        {message && <div className="error-message">{message}</div>}
      </div>
      {isLoading && (
        <div className="loading-container">
          <div className="loading-indicator">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Login;
