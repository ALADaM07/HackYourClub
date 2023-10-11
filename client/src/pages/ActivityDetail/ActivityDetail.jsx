import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailPage from "../../components/detailPage/DetailPage";
import useFetch from "../../hooks/useFetch.js";
import "./activityDetail.css";

const ActivityDetail = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [slideNumber, setSlideNumber] = useState(0);

  const handleOpen = (i) => {
    setSlideNumber(i);
  };
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const { isLoading, performFetch, cancelFetch } = useFetch(
    `/activities/${params.id}`,
    (response) => setData(response.result)
  );

  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, []);

  return (
    <div className="activityDetail">
      {isLoading && (
        <div className="loading-container">
          <div className="loading-indicator">Loading...</div>
        </div>
      )}
      {!isLoading && (
        <DetailPage
          data={data}
          slideNumber={slideNumber}
          handleMove={handleMove}
          handleOpen={handleOpen}
          type="activities"
        />
      )}
    </div>
  );
};

export default ActivityDetail;
