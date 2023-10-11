import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./searchItem.scss";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.uriPhotos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDesc">{item.description}</span>
        <span className="siTaxiOp">{item.meetingSchedule}</span>
        <span className="siDistance">
          <FontAwesomeIcon icon={faLocationDot} /> {item.address.street},{" "}
          {item.address.city}, {item.address.zip}
        </span>
      </div>

      <div className="siDetails">
        {item.category && (
          <div className="siRating">
            <span></span>
            <button>{item.category}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.membershipFee}</span>
          <span className="siTaxOp">membershipFee</span>
          <Link to={`/clubs/${item._id}`}>
            <Button className="search-btn" variant="outline-success">
              See Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

SearchItem.propTypes = {
  item: PropTypes.shape({
    uriPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    meetingSchedule: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    category: PropTypes.string.isRequired,
    membershipFee: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchItem;
