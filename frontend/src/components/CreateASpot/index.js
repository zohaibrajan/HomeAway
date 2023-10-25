import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateASpot.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createASpotThunk } from "../../store/spots";
import { addSpotImagesThunk } from "../../store/spots";

function CreateASpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [errors, setErrors] = useState({});

  if (!user) {
    history.replace("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    const spotImgs = [
      {
        url: previewImageUrl,
        preview: true,
      },
    ];

    [url1, url2, url3, url4].forEach((url) => {
      if (url) {
        spotImgs.push({
          url,
          preview: false,
        });
      } else {
        spotImgs.push({
          url: "https://www.ewingoutdoorsupply.com/media/catalog/product/placeholder/default/shutterstock_161251868.png",
          preview: false,
        });
      }
    });

    const spotDetails = {
      ownerId: user.id,
      address,
      country,
      city,
      lat: latitude,
      lng: longitude,
      state,
      description,
      name,
      price,
    };

    if (!previewImageUrl.length) {
      errors.previewImageUrl = "Preview image is required";
    }

    if (
      !previewImageUrl.includes(".png") &&
      !previewImageUrl.includes(".jpg") &&
      !previewImageUrl.includes(".jpeg")
    ) {
      errors.urlEndsWith = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (!country.length) errors.country = "Country is required"

    if (!address.length) errors.address = "Address is required"

    if (!city.length) errors.city = "City is required"

    if (!state.length) errors.state = "State is required"

    if (!latitude) errors.lat = "Latitude is required";

    if (!longitude) errors.lng = "Longitude is required"

    if (latitude > 90 || latitude < -90) errors.lat = "Latitude is invalid";

    if (longitude > 90 || longitude < -90) errors.lng = "Longitude is invalid";

    if (description.length < 30) errors.description = "Description needs a minimum of 30 characters";

    if (!name.length) errors.name = "Name is required"

    if (price < 0) errors.price = "Price is invalid";

    if (!price) errors.price = "Price is required"

    if (!Object.keys(errors).length) {
        const res = await dispatch(createASpotThunk(spotDetails));
        await dispatch(addSpotImagesThunk(res.id, spotImgs));
        history.push(`/spots/${res.id}`);
    }

    setErrors(errors)
  };


  return (
    <div className="create-form-container">
      <div className="create-a-spot-div">
        <form className="create-a-spot-form" onSubmit={handleSubmit}>
          <h2 style={{ margin: "0" }}>Create a new Spot</h2>
          <h3 style={{ margin: "10px 0 0 0" }}>Where's your place located?</h3>
          <span style={{ marginBottom: "30px" }}>
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
          {errors.country && (
            <p style={{ fontSize: "12px", color: "red", margin: "5px 0 0 0" }}>
              *{errors.country}
            </p>
          )}
          <span className="form-labels">Street Address</span>
          <input
            type="text"
            name="streetAddress"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p style={{ fontSize: "12px", color: "red", margin: "5px 0 0 0" }}>
              *{errors.address}
            </p>
          )}
          <span className="form-labels">City</span>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && (
            <p style={{ fontSize: "12px", color: "red", margin: "5px 0 0 0" }}>
              *{errors.city}
            </p>
          )}
          <span className="form-labels">State</span>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && (
            <p style={{ fontSize: "12px", color: "red", margin: "5px 0 0 0" }}>
              *{errors.state}
            </p>
          )}
          <span className="form-labels">Latitude</span>
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          {errors.lat && (
            <p style={{ fontSize: "12px", color: "red", margin: "5px 0 0 0" }}>
              *{errors.lat}
            </p>
          )}
          <span className="form-labels">Longitude</span>
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          {errors.lng && (
            <p style={{ fontSize: "12px", color: "red", margin: "5px 0 0 0" }}>
              *{errors.lng}
            </p>
          )}
          <span id="form-split-one"></span>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            Describe your place to guests
          </span>
          <span
            style={{ fontSize: "12px", fontWeight: "200", margin: "10px 0" }}
          >
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </span>
          <textarea
            id="spot-description"
            rows="8"
            name="description"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p style={{ fontSize: "12px", color: "red", margin: "5px 0 0 0" }}>
              {errors.description}
            </p>
          )}
          <span id="form-split-one"></span>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            Create a title for your spot
          </span>
          <span
            style={{ fontSize: "12px", fontWeight: "200", margin: "10px 0" }}
          >
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </span>
          <input
            type="text"
            name="title"
            placeholder="Create a title for your spot"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p style={{ fontSize: "12px", color: "red", margin: "5px 0 0 0" }}>
              *Name is required
            </p>
          )}
          <span id="form-split-one"></span>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            Set a base price for your spot
          </span>
          <span
            style={{ fontSize: "12px", fontWeight: "200", margin: "10px 0" }}
          >
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </span>
          <input
            type="number"
            name="pricePerNight"
            placeholder="Price per night (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && (
            <p style={{ fontSize: "12px", color: "red", margin: "5px 0 0 0" }}>
              *{errors.price}
            </p>
          )}
          <span id="form-split-one"></span>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            Liven up your spot with photos
          </span>
          <span
            style={{ fontSize: "12px", fontWeight: "200", margin: "10px 0" }}
          >
            Submit photos to publish your spot.
          </span>
          <input
            className="spot-img-urls"
            type="text"
            name="previewImageUrl"
            placeholder="Preview Image URL"
            value={previewImageUrl}
            onChange={(e) => setPreviewImageUrl(e.target.value)}
          />
          {errors.previewImageUrl && (
            <p style={{ fontSize: "12px", color: "red", margin: "0" }}>
              *{errors.previewImageUrl}
            </p>
          )}
          <input
            disabled={!previewImageUrl.length}
            className="spot-img-urls"
            type="text"
            name="previewImageUrl"
            placeholder="Image Url"
            value={url1}
            onChange={(e) => setUrl1(e.target.value)}
          />
          {errors.urlEndsWith && (
            <p style={{ fontSize: "12px", color: "red", margin: "0" }}>
              *{errors.urlEndsWith}
            </p>
          )}
          <input
            disabled={!previewImageUrl.length}
            className="spot-img-urls"
            type="text"
            name="previewImageUrl"
            placeholder="Image Url"
            value={url2}
            onChange={(e) => setUrl2(e.target.value)}
          />
          <input
            disabled={!previewImageUrl.length}
            className="spot-img-urls"
            type="text"
            name="previewImageUrl"
            placeholder="Image Url"
            value={url3}
            onChange={(e) => setUrl3(e.target.value)}
          />
          <input
            disabled={!previewImageUrl.length}
            className="spot-img-urls"
            type="text"
            name="previewImageUrl"
            placeholder="Image Url"
            value={url4}
            onChange={(e) => setUrl4(e.target.value)}
          />
          <span id="form-split-one"></span>
          <button id="create-spot-submit-button" type="submit">
            Create Spot
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateASpot;
