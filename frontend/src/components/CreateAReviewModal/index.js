import React from "react";
import { useModal } from "../../context/Modal";

function CreateAReviewModal({ spot }) {
    const { closeModal } = useModal();
    return (
      <div className="creat-a-review-modal">
        <h1>Confirm Delete</h1>
        <span id="delete-spot-span">
          Are you sure you want to delete this review?
        </span>
        <button className="confirm-delete">
          Yes (Delete Review)
        </button>
        <button className="do-not-delete" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    );
}


export default CreateAReviewModal;
