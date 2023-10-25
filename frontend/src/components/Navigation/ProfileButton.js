import React, { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const manageSpot = () => {
    history.push("/spots/current");
    closeMenu();
  }

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <i
          className="fa-solid fa-bars profile-icons"
          style={{ fontSize: "19px" }}
        />
        <i
          className="fas fa-user-circle profile-icons"
          style={{ fontSize: "22px" }}
        />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="profile-elements-loggedIn">
              <label style={{margin: "10px 0 0 0"}}>Hello, {user.username}</label>
            </li>
            <li className="profile-elements-loggedIn">
              <label style={{margin: "10px 0 0 0"}}>{user.email}</label>
            </li>

            <li className="profile-elements-manage-spot">
              <label id="manage-spot" onClick={manageSpot}>Manage Spots</label>
            </li>

            <li id="profile-elements-logout-button">
              <button id="logout-button" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
