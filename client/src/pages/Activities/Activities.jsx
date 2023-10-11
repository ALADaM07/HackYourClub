import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import useFetch from "../../hooks/useFetch";
import { classifyData, modifyClassifiedData } from "../../util/string_methods";
import "./Activites.css";

const imgPath =
  "https://www.borneodream.com/wp-content/uploads/snorkeling-tour-trip-in-kota-kinbalu-sabah-1-1200x300px.webp";

const ActivitiesPage = () => {
  const [activities, setActivities] = useState(null);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/activities",
    (response) => {
      const classifiedData = Object.values(classifyData(response.result));
      modifyClassifiedData(classifiedData);

      setActivities(classifiedData);
    }
  );

  useEffect(() => {
    document.body.classList.add("loading");
    performFetch();

    return () => {
      document.body.classList.remove("loading");
      cancelFetch();
    };
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header imgPath={imgPath} />
      {activities &&
        activities.map((singleObject, index) => (
          <ImageCarousel
            key={index}
            singleObject={singleObject}
            type="activities"
          />
        ))}
      {isLoading && (
        <div className="loading-container">
          <div className="loading-indicator">Loading...</div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ActivitiesPage;
