import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsForSpotThunk } from "../../store/reviews";
import "./SpotReviews.css";

function SpotReviews({ spot }) {
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

  console.log('after', reviews)

  useEffect(() => {
    dispatch(getReviewsForSpotThunk(spot.id));
  }, [dispatch]);

  return (
    <div className="reviews-container">
      <div className="spot-reviews-header">
        {spot.avgRating ? (
          <span style={{ fontSize: "25px" }}>
            <i className="fa-solid fa-star "></i>
            {spot.avgRating} - {spot.numReviews} review(s)
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
      {reviews.length > 0 && (
        <div className="reviews">
          {reviews.map((review) => (
            <div className="individual-review">
                <h5></h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SpotReviews;
