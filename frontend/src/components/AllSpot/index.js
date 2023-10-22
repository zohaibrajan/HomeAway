import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SpotTile from "../SpotTile";
import "./AllSpots.css"

function AllSpots() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj);

    // console.log(spots)

    useEffect(() => {
        dispatch(getAllSpotsThunk());
    }, [dispatch])

    if (!spots.length) return null

    return (
        <>
        <div className="all-spots-container">
            {spots.map(spot => (
                <div>
                    <SpotTile spot={spot} />
                </div>
            ))}
        </div>
        </>
    )
}

export default AllSpots
