import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteASpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeleteAReviewModal({ review }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteReview = (e) => {
    e.preventDefault();

    // dispatch(deleteAReviewThunk(review.id)).then(closeModal());

  };

  return (
    <div className="delete-spot-modal">
      <h1>Confirm Delete</h1>
      <span id="delete-spot-span">
        Are you sure you want to delete this review?
      </span>
      <button className="confirm-delete" onClick={deleteReview}>
        Yes (Delete Review)
      </button>
      <button className="do-not-delete" onClick={closeModal}>
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteAReviewModal;
