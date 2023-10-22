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

    if (!spot) return null

    // console.log(spot)

    return (
        <>
            <div className='spot-details-header'>
                <h1>{spot.name}</h1>
                <h3>{spot.city}. {spot.state}, {spot.country}</h3>
            </div>
        </>
    )
}

export default SpotDetailsPage
