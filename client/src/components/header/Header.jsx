import LoginIcon from "@mui/icons-material/Login";
import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import PropTypes from "prop-types";

const Header = ({ imgPath }) => {
  return (
    <div className="header">
      <img src={imgPath} alt="" />
      <div className="info">
        <h3>Explore Clubs & Activities</h3>

        <span className="desc">
          Your Comprehensive Guide to Exploring Local Clubs, Sports, Hobbies,
          Events, and More! Discover Fun and Exciting Activities to Connect with
          Like-Minded People in Your Community
        </span>
        <div className="buttons">
          <button className="play">
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "white" }}
            >
              <LoginIcon />
              <span>Sign up</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
Header.propTypes = {
  imgPath: PropTypes.string.isRequired,
};
export default Header;
