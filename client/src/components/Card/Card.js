import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ singleObject, type }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobileOrTablet(window.innerWidth <= 1200);
    };

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isMobileOrTablet) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={`/${type}/${singleObject._id}`}
    >
      <div
        className={`club-card ${isHovered ? "hovered" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="average-rating" title="Average Rating">
          <h6>{singleObject.averageRating.toFixed(1)}</h6>
        </div>
        <div className="club-image">
          <img src={singleObject.uriPhotos[0]} alt={singleObject.name} />
        </div>
        <div className="club-info">
          <h3 className="club-name">{singleObject.name}</h3>

          <p
            className={`club-description ${
              isMobileOrTablet ? "show-description" : ""
            }`}
          >
            {singleObject.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  singleObject: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default Card;
