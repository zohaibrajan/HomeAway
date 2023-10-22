import { csrfFetch } from "./csrf";

const ALL_SPOTS = 'spots/ALL_SPOTS'
const SPOT_DETAILS = 'spots/SPOT_DETAILS'

const getAllSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots
    }
}

const getASpot = (spot) => {
    return {
        type: SPOT_DETAILS,
        spot
    }
}

export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");

    if (res.ok) {
        const spots = await res.json();
        dispatch(getAllSpots(spots))
        return spots
    }
}

export const getASpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spot = await res.json();
        dispatch(getASpot(spot));
        return spot
    }
}


const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_SPOTS: {
            const newState = {};
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState
        }
        case SPOT_DETAILS: {
            return { ...state, [action.spot.id]: action.spot}
        }
        default: {
            return state;
        }
    }
}

export default spotsReducer;
