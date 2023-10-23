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

    // console.log(spot)

    return (
      <>
        <div className="spot-details">
          <div className="spot-details-header">
            <h2 style={{ marginBottom: "12px" }}>{spot.name}</h2>
            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>
          <div className="spot-details-images">
            <img className="small-image first-img" src={spot.SpotImages[0].url} />
            <img
              className="small-image second-img"
              src={spot.SpotImages[1].url}
            />
            <img className="small-image third-img" src={spot.SpotImages[2].url} />
            <img
              className="small-image fourth-img"
              src={spot.SpotImages[3].url}
            />
            <img className="small-image fifth-img" src={spot.SpotImages[4].url} />
          </div>
          <div>
            
          </div>
        </div>
      </>
    );
}

export default SpotDetailsPage
