import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">All Activities</li>
          <li className="fListItem">Outdoor Adventures</li>
          <li className="fListItem">Nightlife</li>
          <li className="fListItem">Sports & Fitness</li>
          <li className="fListItem">Arts & Culture</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Popular Clubs</li>
          <li className="fListItem">Music Venues</li>
          <li className="fListItem">Dance Classes</li>
          <li className="fListItem">Workshops & Classes</li>
          <li className="fListItem">Special Events</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Featured Destinations</li>
          <li className="fListItem">Plan a Trip</li>
          <li className="fListItem">Reviews</li>
          <li className="fListItem">Community</li>
          <li className="fListItem">Deals & Offers</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Customer Support</li>
          <li className="fListItem">Partnerships</li>
          <li className="fListItem">Careers</li>
          <li className="fListItem">Sustainability</li>
        </ul>
      </div>
      <div className="fText">Copyright © 2023 HackYourClub</div>
    </div>
  );
};

export default Footer;
