import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";

const AppWrapper = ({ children }) => {
  return <Router>{children}</Router>;
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
