import React from "react";
import './DeleteASpot.css'
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteASpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function DeleteASpotModal({ spot }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteSpot = (e) => {
        e.preventDefault();

        try {
            dispatch(deleteASpotThunk(spot.id)).then(closeModal())
            history.push("/spots/current");
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <div className="delete-spot-modal">
      <h1>Confirm Delete</h1>
      <span id="delete-spot-span">Are you sure you want to remove this spot from the listings?</span>
      <button className="confirm-delete" onClick={deleteSpot}>Yes (Delete Spot)</button>
      <button className="do-not-delete" onClick={closeModal}>No (Keep Spot)</button>
    </div>
  );
}

export default DeleteASpotModal;
