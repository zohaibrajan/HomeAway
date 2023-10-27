import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import CreateASpot from '../CreateASpot'
import { getASpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EditASpot() {
    const user = useSelector(state => state.session.user)
    const history = useHistory();
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);

    if (!user) {
        history.replace("/")
    }

    useEffect(() => {
        if (spot) dispatch(getASpotThunk(spotId))
    }, [dispatch, spotId]);

    if (!spot) {
        history.push("/");
        return null
    }

    // console.log(spot)
    return (
        <CreateASpot formType="Update Spot" spot={spot}/>
    )
}

export default EditASpot
