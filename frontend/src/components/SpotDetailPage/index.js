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

    console.log(spot)

    return (
        <>
        <div className='spot-details'>
            <div className='spot-details-header'>
                <h2 style={{marginBottom: "12px"}}>{spot.name}</h2>
                <span>{spot.city}, {spot.state}, {spot.country}</span>
            </div>
        </div>
        </>
    )
}

export default SpotDetailsPage
