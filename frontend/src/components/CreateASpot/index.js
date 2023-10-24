import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CreateASpot.css";

function CreateASpot() {
  const user = useSelector((state) => state.session.user);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  if (!user) {
    return <h1>Please Log-In</h1>;
  }

  return (
    <div className="create-form-container">
      <div className="create-a-spot-div">
        <form className="create-a-spot-form">
          <h2 style={{margin: "0"}}>Create a new Spot</h2>
          <h3 style={{margin: "10px 0 0 0"}}>Where's your place located?</h3>
          <span style={{marginBottom: "30px"}}>
            Guest will only get your exact address once they booked a
            reservation.
          </span>
          <span className="form-labels">Country</span>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            name="streetAddress"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <textarea
            name="description"
            placeholder="Describe your place to guests"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            name="title"
            placeholder="Create a title for your spot"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            name="pricePerNight"
            placeholder="Nightly price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            name="previewImageUrl"
            placeholder="Preview Image URL"
            value={previewImageUrl}
            onChange={(e) => setPreviewImageUrl(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateASpot;
