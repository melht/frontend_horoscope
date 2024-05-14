import React from "react";
import { Link } from "react-router-dom";
import "./Common.css";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            <i className="fa fa-star" aria-hidden="true"></i>
            <span className="navbar-text">Horoscopes for you</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="show-horoscope">
                  Horoscope
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="create-user">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
