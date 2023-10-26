import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsForSpotThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteAReviewModal from "../DeleteAReviewModal";
import "./SpotReviews.css";

function SpotReviews({ spot }) {
  const user = useSelector(state => state.session.user)
  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);
  const dispatch = useDispatch();

  //   console.log(spot.avgRating);

  const postReview = () => {
    alert("Feature coming soon...");
  };

//   console.log('before', reviews)

  reviews.sort((a, b) => {
    const date1 = new Date(a.createdAt)
    const date2 = new Date(b.createdAt);
    return date2 - date1
  })

  // console.log('after', reviews)

  useEffect(() => {
    dispatch(getReviewsForSpotThunk(spot.id));
  }, [dispatch]);

  let spotRating;
  if (reviews.length) {
    spotRating = reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length
  }

  // console.log(spotRating)

  return (
    <div className="reviews-container">
      <div className="spot-reviews-header">
        {reviews.length > 0 ? (
          <span style={{ fontSize: "25px" }}>
            <i className="fa-solid fa-star "></i>
            {spotRating.toFixed(2)} - {reviews.length} review(s)
          </span>
        ) : (
          <span style={{ fontSize: "25px" }}>
            <i className="fa-solid fa-star "></i>
            New
          </span>
        )}
      </div>
      <button
        style={{
          width: "120px",
          backgroundColor: "gray",
          color: "white",
          margin: "15px 0 0 0",
          boxShadow: "2px 2px 2px black",
        }}
        onClick={postReview}
      >
        Post A Review
      </button>
      {reviews.length > 0 ? (
        <div className="reviews">
          {reviews.map((review) => (
            <div className="individual-review">
              <span id="review-firstName">{review.User.firstName}</span>
              <span id="review-date">{review.createdAt.slice(0, 10)}</span>
              <p style={{ margin: "0", marginBottom: "10px" }}>{review.review}</p>
              {user && user.id === review.userId && (
                <OpenModalButton
                buttonText={"Delete"}
                modalComponent={<DeleteAReviewModal review={review}/>}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <span id="review-firstName">Be the frst to post a review!</span>
      )}
    </div>
  );
}

export default SpotReviews;
