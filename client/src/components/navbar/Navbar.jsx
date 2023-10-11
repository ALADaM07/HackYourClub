import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./navbar.css";

function NavScrollExample() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/clubs/search/${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(e);
    }
  };

  const isLinkActive = (route) => location.pathname === route;
  return (
    <Navbar expand="lg" className="bg-black navbar">
      <Container fluid>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand className="text-secondary bold-text main-logo">
            HackYourClub
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          className="bg-light text-dark"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <ul className="nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${isLinkActive("/") ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/activities"
                  className={`nav-link ${
                    isLinkActive("/activities") ? "active" : ""
                  }`}
                >
                  Activities
                </Link>
              </li>
              {user && (
                <li className="nav-item">
                  <Link
                    to="/favorites"
                    className={`nav-link ${
                      isLinkActive("/favorites") ? "active" : ""
                    }`}
                  >
                    Favorites
                  </Link>
                </li>
              )}
            </ul>
          </Nav>
          <Form className="d-flex transparent-search-bar">
            <Form.Control
              type="search"
              placeholder="Search here..."
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              className="search-btn"
              variant="outline-success"
              onClick={handleSearch}
              disabled={!searchQuery}
            >
              Search
            </Button>
            {user ? (
              <>
                <Button
                  className="auth-btn"
                  variant="outline-success"
                  onClick={handleLogout}
                >
                  <Link style={{ textDecoration: "none", color: "white" }}>
                    Logout
                  </Link>
                </Button>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginTop: "11px",
                  }}
                >
                  <span className="user-name">{user.firstName}</span>
                </Link>
                <img className="user-img" src={user.profileImage} alt="" />
              </>
            ) : (
              <>
                <Button className="auth-btn" variant="outline-success">
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    LOGIN
                  </Link>
                </Button>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
