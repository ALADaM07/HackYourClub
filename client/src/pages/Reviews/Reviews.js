import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import "./Reviews.css";

const ReviewForm = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const type = params.get("type");
  const navigate = useNavigate();

  const [reviewAdded, setReviewAdded] = useState(false);
  const [countdown, setCountdown] = useState(2);

  const navigateToPreviousPage = () => {
    navigate(-1);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/reviews",
    onReceived
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  async function onReceived() {
    setReviewAdded(true);

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      navigateToPreviousPage();
      clearInterval(intervalId);
    }, 2000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.trim() === "") {
      alert("Please enter a review");
      return;
    }

    const data = { type, id, review, rating };
    const token = localStorage.getItem("token");

    performFetch({
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setReview("");
    setRating(1);
  };

  return (
    <div className="review-wrapper">
      <div className="review-form-container">
        {reviewAdded ? (
          <div className="review-added">
            <p>Your review has been added.</p>
            <div className="countdown-container">
              <p>Redirecting in {countdown} seconds...</p>
            </div>
          </div>
        ) : (
          <div>
            <h2>Add a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="review">Review:</label>
                <textarea
                  id="review"
                  className="form-control"
                  value={review}
                  onChange={handleReviewChange}
                  rows="4"
                  cols="50"
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  className="form-control"
                  value={rating}
                  onChange={handleRatingChange}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
