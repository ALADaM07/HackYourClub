import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import "./ImageCarousel.css";
import { capitalizeWords } from "../../util/string_methods";
import { carouselOptions } from "../../util/carousel_setup";

function ImageCarousel({ singleObject, type }) {
  return (
    <div className="wrapper-carousel">
      <h2 className="carousel-title">
        {singleObject[0].category && capitalizeWords(singleObject[0].category)}
      </h2>
      <Carousel className="carousel-itself" {...carouselOptions}>
        {singleObject && singleObject.length > 0 ? (
          singleObject.map((singleData, index) => (
            <div key={index}>
              <Card singleObject={singleData} type={type} />
            </div>
          ))
        ) : (
          <div>No images available</div>
        )}
      </Carousel>
    </div>
  );
}

ImageCarousel.propTypes = {
  singleObject: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default ImageCarousel;
