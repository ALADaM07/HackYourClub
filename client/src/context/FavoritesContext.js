import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";

import useFetch from "../hooks/useFetch";
import { AuthContext } from "./AuthContext";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const { user, setUser } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const {
    isLoading: isAddLoading,
    error: addError,
    performFetch: performAddFetch,
  } = useFetch("/favorites/add");
  const {
    isLoading: isRemoveLoading,
    error: removeError,
    performFetch: performRemoveFetch,
  } = useFetch("/favorites/remove");

  const isFavorite = (id) => {
    return (
      user &&
      (user.favoriteClubs.some((club) => club._id === id) ||
        user.favoriteActivities.some((activity) => activity._id === id))
    );
  };

  const toggleFavorite = (type, id, data) => {
    if (!user) {
      alert("Please log in to favorite items.");
      return;
    }

    if (isFavorite(id)) {
      performRemoveFetch({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          id: id,
        }),
      });
      setUser((prevUser) => ({
        ...prevUser,
        favoriteActivities: prevUser.favoriteActivities.filter(
          (activity) => activity._id !== id
        ),
        favoriteClubs: prevUser.favoriteClubs.filter((club) => club._id !== id),
      }));
    } else {
      performAddFetch({
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          id: id,
        }),
      });
      setUser((prevUser) => ({
        ...prevUser,
        favoriteActivities:
          type === "clubs"
            ? prevUser.favoriteActivities
            : [...prevUser.favoriteActivities, data],
        favoriteClubs:
          type === "clubs"
            ? [...prevUser.favoriteClubs, data]
            : prevUser.favoriteClubs,
      }));
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites:
          user == null
            ? []
            : [...user.favoriteActivities, ...user.favoriteClubs],
        toggleFavorite,
        isFavorite,
        isAddLoading,
        addError,
        isRemoveLoading,
        removeError,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
