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

    const handleClick = (e) => {
        e.preventDefault();

        alert("Feature Coming Soon...")
    }

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
          {spot.SpotImages.length < 5 ? (
          <p>Less than 5</p>) : (
          <div className="spot-details-images">
            <img
              className="small-image first-img"
              src={spot.SpotImages[0].url}
            />
            <img
              className="small-image second-img"
              src={spot.SpotImages[1].url}
            />
            <img
              className="small-image third-img"
              src={spot.SpotImages[2].url}
            />
            <img
              className="small-image fourth-img"
              src={spot.SpotImages[3].url}
            />
            <img
              className="small-image fifth-img"
              src={spot.SpotImages[4].url}
            />
          </div>

          )}
          <div className="spot-details-info">
            <div className="spot-owner-description">
              <h2 style={{margin: "0"}}>
                Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
              </h2>
              <p style={{fontSize: "14px"}}>{spot.description}</p>
            </div>
            <div className="spot-booking-tile">
              <div className="spot-price-review">
                <span style={{fontWeight: "500"}}id="spot-price"><i>${spot.price}</i> night</span>
                {spot.numReviews ? (
                  <p>
                    <i className="fa-solid fa-star "></i>
                    {spot.avgRating} - {spot.numReviews} review(s)
                  </p>
                ) : (
                  <p>
                    <i className="fa-solid fa-star"></i>
                    New
                  </p>
                )}
              </div>
              <div className="reserve-spot">
                <button id="reserve-button" onClick={handleClick}>Reserve</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default SpotDetailsPage
