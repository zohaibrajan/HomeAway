import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersSpotsThunk } from "../../store/spots";
import SpotTile from "../SpotTile";
import "./UserSpots.css";
import { useHistory } from "react-router-dom";

function UserSpot() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);

  if (!user) {
    history.push("/");
  }

  useEffect(() => {
    dispatch(getUsersSpotsThunk());
  }, [dispatch]);

  const createASpot = (e) => {
    e.preventDefault();
    history.push("/spots/new");
  }

  const updateASpot = (e, spot) => {
    e.preventDefault();
    // console.log(spot)
    history.push(`/spots/${spot.id}/edit`);
  }


  return (
    <div className="manage-spots-container">
      <div className="manage-spot-header">
        <h2 style={{ margin: "10px 0" }}>Manage Your Spots</h2>
        <button
          style={{
            backgroundColor: "gray",
            color: "white",
            boxShadow: "2px 2px 2px black",
          }}
          onClick={createASpot}
        >
          Create a New Spot
        </button>
      </div>
      <div className="manage-spots-tiles-contaier">
        {spots.length > 0 && (
          <div className="manage-spot-tiles">
            {spots.map((spot) => (
              <div className="individual-tiles">
                <SpotTile spot={spot} />
                <button
                  style={{
                    cursor: "pointer",
                    margin: "40px 10px 10px 10px",
                    backgroundColor: "gray",
                    color: "white",
                    boxShadow: "2px 2px 2px black",
                  }}
                  onClick={(e) => updateASpot(e, spot)}
                >
                  Update
                </button>
                <button
                  style={{
                    cursor: "pointer",
                    backgroundColor: "gray",
                    color: "white",
                    boxShadow: "2px 2px 2px black",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSpot;