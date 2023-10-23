import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { getASpotThunk } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import './SpotDetailPage.css'

function SpotDetailsPage() {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);

    useEffect(() => {
        dispatch(getASpotThunk(spotId));
    }, [dispatch])


    if (!spot?.Owner) return null

    console.log(spot)

    return (
      <>
        <div className="spot-details">
          <div className="spot-details-header">
            <h2 style={{ marginBottom: "12px" }}>{spot.name}</h2>
            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>
          <div className="spot-details-image">
            <img className="first-img" src={spot.SpotImages[0].url} />
            <img className="second-img" src={spot.SpotImages[1].url} />
            <img className="third-img" src={spot.SpotImages[2].url} />
            <img className="fourth-img" src={spot.SpotImages[3].url} />
            <img className="fifth-img" src={spot.SpotImages[4].url} />
          </div>
        </div>
      </>
    );
}

export default SpotDetailsPage
