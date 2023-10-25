import React from "react";
import './DeleteASpot.css'
import { useModal } from "../../context/Modal";


function DeleteASpotModal() {
    const { closeModal } = useModal();

    const deleteSpot = (e) => {
        e.preventDefault();
    }

  return (
    <div className="delete-spot-modal">
      <h1>Confirm Delete</h1>
      <span id="delete-spot-span">Are you sure you want to remove this spot from the listings?</span>
      <button className="confirm-delete">Yes (Delete Spot)</button>
      <button className="do-not-delete" onClick={closeModal}>No (Keep Spot)</button>
    </div>
  );
}

export default DeleteASpotModal;
