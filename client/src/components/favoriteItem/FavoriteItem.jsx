import PropTypes from "prop-types";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import regularHeart from "../../assets/heart-regular.svg";
import solidHeart from "../../assets/heart-solid.svg";
import { useFavorites } from "../../context/FavoritesContext";
import "./FavoriteItem.css";

const FavoriteItem = ({ data }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const linkTo =
    data.type === "clubs" ? `/clubs/${data._id}` : `/activities/${data._id}`;

  return (
    <Card className="favorite-card">
      <div className="image-container">
        <Card.Img
          src={data.uriPhotos[0]}
          alt={data.name}
          className="card-img"
        />
        <div
          className="heart-icon"
          onClick={() => toggleFavorite(data.type, data._id, data)}
        >
          <img
            src={isFavorite(data._id) ? solidHeart : regularHeart}
            alt="Favorite"
          />
        </div>
      </div>
      <Card.Body className="card-body ">
        <Card.Title className="card-title">{data.name}</Card.Title>
        <Card.Text className="card-description">{data.description}</Card.Text>
        <div className="rating">
          <Card.Text className="card-rating">{data.averageRating}</Card.Text>
        </div>
        <div className="d-btn">
          <Link
            to={linkTo}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Button className="details-btn" variant="outline-success">
              See Details
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

FavoriteItem.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object,
  type: PropTypes.string,
};

export default FavoriteItem;
