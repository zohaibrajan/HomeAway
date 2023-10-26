import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from "../../context/Modal";
import { createAReviewThunk } from "../../store/reviews";
import "./CreateAReview.css";

function CreateAReviewModal({ spot }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const { closeModal } = useModal();
  const [reviewText, setReviewText] = useState("");
  const [activeRating, setActiveRating] = useState(0);
  const [rating, setRating] = useState(0)
  const disabled = reviewText.length < 10;
  const className = disabled ? "not-confirmed-review" : "confirm-review";

  // console.log(user)

  const onChange = (number) => {
    setRating(parseInt(number));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = {
      review: reviewText,
      stars: rating
    }

    dispatch(createAReviewThunk(spot.id, review, user)).then(closeModal())
  };

  // console.log(rating);
  return (
    <div className="create-a-review-modal">
      <h1>How was your stay?</h1>
      <textarea
        id="review-text"
        rows="8"
        name="review"
        placeholder="Leave your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <div className="rating-input">
        <div
          onMouseEnter={() => {
            if (!disabled) setActiveRating(1);
          }}
          onMouseLeave={() => {
            if (!disabled) setActiveRating(rating);
          }}
          onClick={() => {
            if (!disabled) onChange(1);
          }}
        >
          <i
            className={
              activeRating >= 1 || rating >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
        </div>
        <div
          onMouseEnter={() => {
            if (!disabled) setActiveRating(2);
          }}
          onMouseLeave={() => {
            if (!disabled) setActiveRating(rating);
          }}
          onClick={() => {
            if (!disabled) onChange(2);
          }}
        >
          <i
            className={
              activeRating >= 2 ||  rating >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
        </div>
        <div
          onMouseEnter={() => {
            if (!disabled) setActiveRating(3);
          }}
          onMouseLeave={() => {
            if (!disabled) setActiveRating(rating);
          }}
          onClick={() => {
            if (!disabled) onChange(3);
          }}
        >
          <i
            className={
              activeRating >= 3 || rating >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
        </div>
        <div
          onMouseEnter={() => {
            if (!disabled) setActiveRating(4);
          }}
          onMouseLeave={() => {
            if (!disabled) setActiveRating(rating);
          }}
          onClick={() => {
            if (!disabled) onChange(4);
          }}
        >
          <i
            className={
              activeRating >= 4 || rating >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
        </div>
        <div
          onMouseEnter={() => {
            if (!disabled) setActiveRating(5);
          }}
          onMouseLeave={() => {
            if (!disabled) setActiveRating(rating);
          }}
          onClick={() => {
            if (!disabled) onChange(5);
          }}
        >
          <i
            className={
              activeRating >= 5 || rating >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
        </div>
        <span style={{ fontSize: "15px", marginLeft: "5px" }}>Stars</span>
      </div>
      <button className={className} disabled={disabled} onClick={handleSubmit}>
        Submit Your Review
      </button>
    </div>
  );
}

export default CreateAReviewModal;
