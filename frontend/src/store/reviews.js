import { csrfFetch } from "./csrf";
const GET_REVIEWS_FOR_SPOT = "reviews/GET_REVIEWS_FOR_SPOT";

const getReviewsForSpot = (reviews) => {
    return {
        type: GET_REVIEWS_FOR_SPOT,
        reviews
    }
}



export const getReviewsForSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getReviewsForSpot(reviews));
        return reviews
    }
}



const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEWS_FOR_SPOT: {
            const newState = {};
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        default: {
            return state;
        }
    }
}

export default reviewsReducer;
