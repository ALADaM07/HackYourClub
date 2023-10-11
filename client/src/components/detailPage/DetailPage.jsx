import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import regularHeart from "../../assets/heart-regular.svg";
import solidHeart from "../../assets/heart-solid.svg";
import { AuthContext } from "../../context/AuthContext.js";
import useFetch from "../../hooks/useFetch.js";

import { useFavorites } from "../../context/FavoritesContext";
import "./detailPage.css";
const DetailPage = ({
  data,
  activityNames,
  activityIds,
  slideNumber,
  handleMove,
  type,
}) => {
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(3);

  const { error, performFetch, cancelFetch } = useFetch(
    "/reviews/details",
    (response) => {
      setReviews(response);
    }
  );

  const { isFavorite, toggleFavorite } = useFavorites();

  const navigate = useNavigate();

  const navigateToPreviousPage = () => {
    navigate(-1);
  };

  const buttonAddReviewHandler = () => {
    navigate(`/reviews?id=${data._id}&type=${type}`);
  };

  const handleShowMore = () => {
    setVisibleReviews(visibleReviews + 3);
  };

  useEffect(() => {
    if (data) {
      performFetch({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.reviews),
      });
    }
    return cancelFetch;
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="clubContainer">
      <div className="clubWrapper">
        <div className="clubDetails">
          <div className="clubDetailsTexts">
            <h5 className="clubTitle">{data.name}</h5>
            <p className="clubDesc">{data.description}</p>
          </div>
        </div>

        <div className="clubDetailsPrice">
          <p className="secondTitle">Welcome to {data.name}</p>
          <img
            className="heart-fav"
            src={isFavorite(data._id) ? solidHeart : regularHeart}
            alt="Favorite"
            onClick={() => toggleFavorite(data.type, data._id, data)}
            style={{ cursor: "pointer" }}
          />

          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img
                src={data.uriPhotos[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
          <div className="clubAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>
              {data.address && data.address.street && (
                <>
                  {data.address.street}, {data.address.city}, {data.address.zip}
                </>
              )}
            </span>
          </div>
          <span className="category">Category: {data.category}</span>
          {data.price !== undefined && data.price !== null && (
            <span>Price: ${data.price}</span>
          )}

          {type === "clubs" &&
            data.discount !== undefined &&
            data.discount !== null &&
            data.discount !== 0 && (
              <span>We have a discount {data.discount} for you</span>
            )}

          {type === "clubs" &&
            data.membershipFee !== undefined &&
            data.membershipFee !== null && (
              <>
                {data.membershipFee !== 0 ? (
                  <span>Membership Fee: ${data.membershipFee}</span>
                ) : (
                  <span>Free to join!</span>
                )}
              </>
            )}

          {data.meetingSchedule !== undefined && (
            <span>We have meetingSchedule ${data.meetingSchedule}</span>
          )}

          {data.startTime !== undefined && (
            <span>Start Time: {new Date(data.startTime).toLocaleString()}</span>
          )}
          {data.endTime !== undefined && (
            <span>End Time: {new Date(data.endTime).toLocaleString()}</span>
          )}

          <hr />

          {type === "clubs" && activityIds.length > 0 && (
            <div className="clubActivities">
              <h5>Activities Related to this club:</h5>
              <ul>
                {activityNames.map((activityName, index) => (
                  <li key={index}>
                    <Link to={`/activities/${activityIds[index]}`}>
                      {activityName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            {reviews.result && reviews.result.length > 0 && (
              <div className="clubReviews">
                <h5 className="reviews-ratings-h5">Reviews & Rating:</h5>
                <h5 className="reviews-ratings-h5">
                  Average Rating:
                  <span className="average-rating-details">
                    {data.averageRating.toFixed(1)}
                  </span>
                </h5>

                <ul className="reviews-list">
                  {reviews.result
                    .slice(0, visibleReviews)
                    .map((review, index) => (
                      <li key={index} className="review-item">
                        <div className="review-header">
                          <img
                            className="review-img"
                            src={review.userId?.profileImage}
                            alt=""
                          />
                          <span className="review-name">
                            {review.userId?.firstName}
                          </span>
                        </div>
                        <p className="review-content">{review?.content}</p>
                        <div className="review-rating">
                          Rating: {review?.rating}/5
                        </div>
                      </li>
                    ))}
                </ul>
                {visibleReviews < reviews.result.length && (
                  <button
                    className="show-more-reviews"
                    onClick={handleShowMore}
                  >
                    Show More Reviews
                  </button>
                )}

                {user && (
                  <button
                    className="show-more-reviews"
                    onClick={buttonAddReviewHandler}
                  >
                    Add Review
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
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

DetailPage.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      zip: PropTypes.string,
      coordinates: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
    }),
    description: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    membershipFee: PropTypes.number,
    meetingSchedule: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    uriPhotos: PropTypes.arrayOf(PropTypes.string),
    reviews: PropTypes.arrayOf(PropTypes.string),
    averageRating: PropTypes.number,
  }),
  handleOpen: PropTypes.func,
  slideNumber: PropTypes.number,
  setOpen: PropTypes.func,
  handleMove: PropTypes.func,
  open: PropTypes.bool,
  type: PropTypes.string,
  route: PropTypes.string,
  activityNames: PropTypes.arrayOf(PropTypes.string),
  activityIds: PropTypes.arrayOf(PropTypes.string),
};

export default DetailPage;
