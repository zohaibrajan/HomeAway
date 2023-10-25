import React from "react";
import { useHistory } from 'react-router-dom';

export default function SpotTile({ spot }) {
  const history = useHistory();
    // console.log(spot)

    const handleClick = () => {
      history.push(`/spots/${spot.id}`)
    }

    return (
      <div className="spot-tile" title={spot.name} onClick={handleClick}>
        <img id="spot-img" src={spot.previewImage} />
        <div className="spot-text">
          <div className="spot-text-details">
          <p>{`${spot.city}, ${spot.state}`}</p>
          <p id="spot-reviews">
            <i class="fa-solid fa-star"></i>
            {spot.avgRating ? spot.avgRating : <p>New</p>}
          </p>
          </div>
            <p id="spot-price"><span style={{fontWeight: "900"}}>${spot.price}</span> Night</p>
        </div>
      </div>
    );
}
