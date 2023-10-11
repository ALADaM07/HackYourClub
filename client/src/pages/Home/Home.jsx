import React, { useEffect, useState } from "react";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import { classifyData, modifyClassifiedData } from "../../util/string_methods";
import "./Home.css";

const imgPath =
  "https://images.pexels.com/photos/878151/pexels-photo-878151.jpeg";

const Home = () => {
  const [clubs, setClubs] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/clubs",
    (response) => {
      const classifiedData = Object.values(classifyData(response.result));
      modifyClassifiedData(classifiedData);
      setClubs(classifiedData);
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
    <div className="App">
      <Header imgPath={imgPath} />
      {clubs &&
        clubs.map((singleObject, index) => (
          <ImageCarousel key={index} singleObject={singleObject} type="clubs" />
        ))}
      {isLoading && (
        <div className="loading-container">
          <div className="loading-indicator">Loading...</div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
