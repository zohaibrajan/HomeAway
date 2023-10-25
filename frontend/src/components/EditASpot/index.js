import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import CreateASpot from '../CreateASpot'
import { getASpotThunk } from "../../store/spots";

function EditASpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);

    useEffect(() => {
        dispatch(getASpotThunk(spotId))
    }, [dispatch, spotId]);

    if (!spot) return null

    // console.log(spot)
    return (
        <CreateASpot formType="Update Spot" spot={spot}/>
    )
}

export default EditASpot
