import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FavoriteItem from "../../components/favoriteItem/FavoriteItem";
import { AuthContext } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

import "./Favorites.css";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const navigateToPreviousPage = () => {
    navigate(-1);
  };

  const clubsFavorites = favorites.filter((data) => data.type === "clubs");
  const activitiesFavorites = favorites.filter(
    (data) => data.type === "activities"
  );

  return (
    <div className="favorite-container">
      <h2>Favorites ({favorites.length})</h2>

      {user ? (
        favorites.length === 0 ? (
          <p>No favorite products yet.</p>
        ) : (
          <div>
            {clubsFavorites.length > 0 && (
              <div className="favorite-clubs">
                <h3>Favorite Clubs</h3>
                <div className="list">
                  {clubsFavorites.map((data) => (
                    <FavoriteItem key={data._id} data={data} type={data.type} />
                  ))}
                </div>
              </div>
            )}
            <div>
              <div className="divider"></div>
            </div>
            {activitiesFavorites.length > 0 && (
              <div className="favorite-activities">
                <h3>Favorite Activities</h3>
                <div className="list">
                  {activitiesFavorites.map((data) => (
                    <FavoriteItem key={data._id} data={data} type={data.type} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        <p>You need to sign in first.</p>
      )}
      <div className="back-btn-container">
        <Button
          className="back-btn"
          variant="outline-success"
          onClick={navigateToPreviousPage}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default FavoritesPage;
