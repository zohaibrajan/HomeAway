import { csrfFetch } from "./csrf";

const ALL_SPOTS = 'spots/ALL_SPOTS'
const SPOT_DETAILS = 'spots/SPOT_DETAILS'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const USERS_SPOTS = 'spots/USERS_SPOTS'

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

const createASpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const editASpotAThunk = (spotId, payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });

    // console.log(res)

    if (res.ok) {
        const spot = await res.json();
        dispatch(createASpot(spot));
        return spot
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const getUsersSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots/current");

    // console.log(res);

    if (res.ok) {
        const spots = await res.json();
        // console.log(spots)
        dispatch(getAllSpots(spots))
        return spots
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
    } else {
        return res
    }
}

export const createASpotThunk = (payload) => async (dispatch) => {
    const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const spot = await res.json();
        dispatch(createASpot(spot));
        return spot
    } else {
        const errors = await res.json();
        return errors
    }
}


export const addSpotImagesThunk = (spotId, spotImages) => async (dispatch) => {
    // console.log('in thunk', spotImages);
    spotImages.forEach(async (img) => {
        await csrfFetch(`/api/spots/${spotId}/images`, {
            method: "POST",
            body: JSON.stringify(img)
        });
    })
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
        case CREATE_SPOT: {
            return {
                ...state,
                [action.spot.id]: action.spot
            }
        }
        default: {
            return state;
        }
    }
}

export default spotsReducer;
