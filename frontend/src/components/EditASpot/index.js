import React from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import CreateASpot from '../CreateASpot'

function EditASpot() {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId])

    // console.log(spot)
    return (
        <CreateASpot formType="Update Spot" spot={spot}/>
    )
}

export default EditASpot
