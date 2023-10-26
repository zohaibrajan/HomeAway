import { csrfFetch } from "./csrf";
const GET_REVIEWS_FOR_SPOT = "reviews/GET_REVIEWS_FOR_SPOT";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const getReviewsForSpot = (reviews) => {
    return {
        type: GET_REVIEWS_FOR_SPOT,
        reviews
    }
}

const deleteAReview = (reviewId) => {
    return  {
        type: DELETE_REVIEW,
        reviewId
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

export const deleteAReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });


  if (res.ok) {
    const confirm = await res.json();
    dispatch(deleteAReview(reviewId));
    return confirm
  }
};



const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEWS_FOR_SPOT: {
            const newState = {};
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.reviewId];
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default reviewsReducer;
