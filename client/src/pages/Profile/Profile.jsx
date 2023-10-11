import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch.js";
import "./Profile.css";

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState("");
  const [updatedUser, setUpdatedUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    dateOfBirth: user?.dateOfBirth || "",
  });
  const [deactivated, setDeactivated] = useState(false);
  const navigate = useNavigate();

  const { performFetch } = useFetch(`/users/${userId}`, (userResponse) => {
    setIsEditing(false);
    setUser(userResponse.result);
  });

  const { performFetch: performDeleteFetch, cancelFetch: cancelDeleteFetch } =
    useFetch(`/users/${userId}`, () => {
      setUser(null);
      localStorage.removeItem("token");
      setDeactivated(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    });

  useEffect(() => {
    setUserId(user?._id);
    return cancelDeleteFetch;
  }, []);

  const handleDeleteClick = () => {
    if (user) {
      let answer = prompt(
        "If you are sure to delete your account please enter: \n       DEACTIVATE MY ACCOUNT"
      );

      if (answer === "DEACTIVATE MY ACCOUNT") {
        const token = localStorage.getItem("token");
        performDeleteFetch({
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        alert("Incorrect input. Account not DEACTIVATE.");
      }
    }
  };

  const handleUpdateClick = () => {
    const token = localStorage.getItem("token");
    performFetch({
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const getTheDate = (dateOfBirth) => {
    const result = dateOfBirth.slice(0, 10);
    return result;
  };

  return (
    <div className="main">
      {user && (
        <div className="container-profile">
          <h2>
            <span>{user.firstName}</span> PROFILE
          </h2>
          <div className="profile-image">
            <img src={user.profileImage} alt="user profile" />
          </div>
          {isEditing ? (
            <div>
              <div className="columns">
                <div className="column">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedUser.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="column">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={updatedUser.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <label>Date of Birth:</label>
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={getTheDate(updatedUser.dateOfBirth)}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button variant="success" onClick={handleUpdateClick}>
                Save Changes
              </Button>
            </div>
          ) : (
            <div>
              <div>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Date of Birth:</strong> {getTheDate(user.dateOfBirth)}
              </div>

              <Button
                variant="success w-100"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
              <Button
                variant="danger w-100 mt-2 p-2"
                onClick={handleDeleteClick}
              >
                Deactivate Account
              </Button>
            </div>
          )}
        </div>
      )}
      {!user && deactivated && (
        <div className="deactivation-message">
          Your account has been successfully deactivated. Redirecting...
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
