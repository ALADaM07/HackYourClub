import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    profileImage:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/554.jpg",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const { isLoading, performFetch, cancelFetch } = useFetch(
    "/auth/signup",
    async (response) => {
      if (response.result === "User already exists!") {
        setMessage(response.result);
      } else if (response.result === "Account reactivated!") {
        setMessage(response.result + ". Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (response.success) {
        setMessage("Registration successful. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      setMessage("Passwords don't match. Please re-enter your password.");
      return;
    }

    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="user-registration">
      <div className="container">
        <h1>SIGN UP</h1>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <fieldset>
            <div id="legend"></div>
            <div className="control-group">
              <label className="control-label" htmlFor="username">
                First Name
              </label>
              <div className="controls">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="control-group">
              <label className="control-label" htmlFor="username">
                Last Name
              </label>
              <div className="controls">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="control-group">
              <label className="control-label" htmlFor="email">
                Email
              </label>
              <div className="controls">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="control-group">
              <label className="control-label" htmlFor="password">
                Date of Birth:
              </label>
              <div className="controls">
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="control-group">
              <label className="control-label" htmlFor="password_confirm">
                Password (Confirm)
              </label>
              <div className="controls">
                <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="control-group">
              <div className="controls">
                <button type="submit" className="btn btn-success">
                  Register
                </button>
              </div>
            </div>
            {message && (
              <div
                className={
                  message === "User already exists!" ? "error" : "success"
                }
                style={{ marginTop: "10px", color: "green", fontSize: "18px" }}
              >
                {message}
              </div>
            )}
            {isLoading && (
              <div className="loading-container">
                <div className="loading-indicator">Loading...</div>
              </div>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
