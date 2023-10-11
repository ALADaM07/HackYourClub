import "./advancedSearch.scss";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import SearchItem from "../../components/searchItem/SearchItem";

const AdvancedSearch = () => {
  const { query } = useParams();
  const [clubs, setClubs] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/clubs/search?name=${query}&limit=10`,
    (response) => {
      setClubs(response.result);
    }
  );

  useEffect(() => {
    if (query) {
      performFetch();
    }

    return cancelFetch;
  }, [query]);

  return (
    <div className="advanced-search-container">
      <div className="listContainer">
        <div className="listResult">
          {error ? (
            <div className="error-message">No clubs found</div>
          ) : clubs.length === 0 ? (
            <div className="no-clubs-message">No clubs found</div>
          ) : (
            clubs.map((item) => <SearchItem key={item._id} item={item} />)
          )}
          {isLoading && (
            <div className="loading-container">
              <div className="loading-indicator">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
