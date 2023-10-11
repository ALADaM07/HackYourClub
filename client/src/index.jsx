import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppWrapper from "./AppWrapper";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { SearchContextProvider } from "./context/SearchContext";

ReactDOM.render(
  <AppWrapper>
    <SearchContextProvider>
      <AuthProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AuthProvider>
    </SearchContextProvider>
  </AppWrapper>,
  document.getElementById("root")
);
