import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import "./CreateAReview.css"

function CreateAReviewModal({ spot }) {
    const { closeModal } = useModal();
    const [reviewText, setReviewText] = useState("")
    const [stars, setStars] = useState(0);
    const disabled = reviewText.length < 10;

    const className = disabled ? "not-confirmed-review" : "confirm-review";

    const handleSubmit = () => {

    }

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
        <button className={className} disabled={disabled}>Submit Your Review</button>
      </div>
    );
}


export default CreateAReviewModal;
