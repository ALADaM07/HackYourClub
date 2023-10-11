import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Activities from "./pages/Activities/Activities";
import ActivityDetail from "./pages/ActivityDetail/ActivityDetail";
import AdvancedSearch from "./pages/AdvancedSearch/AdvancedSearch";
import ClubDetail from "./pages/ClubDetail/ClubDetail";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Reviews from "./pages/Reviews/Reviews";
import Signup from "./pages/Signup/Signup";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs/search/:query" element={<AdvancedSearch />} />
        <Route path="/clubs/:id" element={<ClubDetail />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
