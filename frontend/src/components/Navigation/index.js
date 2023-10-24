import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateASpot from "../CreateASpot";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser);

  return (
    <ul className="nav-bar">
      <li>
        <NavLink className="nav-logo" exact to="/">
          <img
            width="25px"
            height="25px"
            src="https://copasi.org/images/house.png"
          />
          <p
            style={{
              fontSize: "17px",
              color: "red",
              fontFamily: "Avenir",
              fontWeight: "600",
            }}
          >
            HomeAway
          </p>
        </NavLink>
      </li>
      {sessionUser && (
        <NavLink exact to="/spots/new" id="create-a-spot">
          Create A Spot
        </NavLink>
      )}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
