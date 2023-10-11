import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailPage from "../../components/detailPage/DetailPage";
import useFetch from "../../hooks/useFetch.js";

const ClubDetail = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  const [activityNames, setActivityNames] = useState([]);
  const [activityIds, setActivityIds] = useState([]);
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

  const {
    isLoading: clubIsLoading,
    performFetch: fetchClub,
    cancelFetch: cancelClubFetch,
  } = useFetch(`/clubs/${params.id}`, (response) => setData(response.result));

  const {
    isLoading: activitiesIsLoading,
    performFetch: fetchActivities,
    cancelFetch: cancelActivitiesFetch,
  } = useFetch(`/clubs/${params.id}/activities`, (response) => {
    const activityData = response.result;
    const names = activityData.map((activity) => activity.name);
    const ids = activityData.map((activity) => activity._id);
    setActivityNames(names);
    setActivityIds(ids);
  });
  useEffect(() => {
    fetchClub();
    fetchActivities();

    return () => {
      cancelClubFetch();
      cancelActivitiesFetch();
    };
  }, []);

  return (
    <div className="detail">
      {clubIsLoading && (
        <div className="loading-container">
          <div className="loading-indicator">Loading...</div>
        </div>
      )}
      {!clubIsLoading && (
        <DetailPage
          data={data}
          activityNames={activityNames}
          activitiesIsLoading={activitiesIsLoading}
          activityIds={activityIds}
          slideNumber={slideNumber}
          handleOpen={handleOpen}
          handleMove={handleMove}
          type="clubs"
        />
      )}
    </div>
  );
};

export default ClubDetail;
