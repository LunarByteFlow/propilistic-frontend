// UpdatePlaceModal.js
import React, { useState } from "react";
import Modal from "react-modal";

import Perks from "../../Guest/pages/Perks";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

Modal.setAppElement("#root"); // Make sure to set your root element id

const UpdatePlaceModal = ({ isOpen, onRequestClose, onUpdatePlace }) => {
  const [title, setTitle] = useState("");
  const [address, setAddres] = useState("");
  const [perks, setPerks] = useState("");
  const [photoLink, setphotoLink] = useState("");
  const [photos, setPhotos] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [description, setDescription] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState("");
  const [success, setSuccess] = useState(false);
  const { _id } = useParams();

  let navigate = useNavigate();
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (event) => {
    const files = event.target.files;

    try {
      const selectedImages = await Promise.all(
        Array.from(files).map(async (file) => ({
          file,
          preview: await readFile(file),
        }))
      );

      setPhotos(selectedImages);
    } catch (error) {
      console.error("Error reading or processing files:", error);
    }
  };

  const UpdatePlace = async () => {
    try {
      const placesData = new FormData();
      placesData.append("title", title);
      placesData.append("address", address);
      placesData.append("extraInfo", extraInfo);
      placesData.append("checkIn", checkIn);
      placesData.append("checkOut", checkOut);
      placesData.append("maxGuest", maxGuest);
      placesData.append("perks", perks);
      placesData.append("description", description);
      photos.forEach((photo, index) => {
        placesData.append("photos", photo.file);
      });

      // Wait for the POST request to complete
      const response = await axios.post(
        `http://localhost:8000/api/auth/UpdateAdbyId/${_id}`,
        placesData
      );

      setSuccess(true);
      console.log("Response from server:", response.data);
      // Navigate after the request is successful
      navigate("account/places");
    } catch (error) {
      console.error("Error placeing new place:", error);
      // Handle errors here if necessary
    }
  };

  const placePhotoByLink = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:8000/api//upload-by-link",

      { Link: photoLink, headers: { "Content-Type": "application/json" } }
    );
    setPhotos((prev) => {
      return [...prev, data];

      // return [...prev, photoLink];
    });
    setphotoLink("");
  };

  //   const [updatedData, setUpdatedData] = useState({
  //     title: '',
  //     address: '',
  //     // Add other fields that you want to update
  //   });

  //   const handleInputChange = (e) => {
  //     setUpdatedData({
  //       ...updatedData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   const handleUpdate = () => {
  //     // Call the update function and pass the updated data
  //     onUpdatePlace(updatedData);

  //     // Close the modal
  //     onRequestClose();
  //   };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Place Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="text-center max-w-md mx-auto my-3 container">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Update your Tile"
            className="w-full py-2 px-3 border rounded focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddres(ev.target.value)}
            placeholder="Enter your Updated address here..."
            className="w-full py-2 px-3 border rounded focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <>
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">Photos</h1>
              <p className="text-gray-600">
                place photos for a better experience.
              </p>
              <div className="flex">
                {" "}
                <input
                  type="text"
                  value={photoLink}
                  onChange={(ev) => setphotoLink(ev.target.value)}
                  placeholder={"place using Link..."}
                  className=" focus:border-primary focus:outline-none "
                />
                <button
                  onClick={placePhotoByLink}
                  className="bg-primary hover:bg-pink-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                >
                  place Photo
                </button>
                {/* grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 */}
              </div>
              <div className=" mt-2 grid w-full gap-2  ">
                {photoLink.length > 0 &&
                  photoLink.map((Link) => (
                    <div key={Link}>
                      {/* `http://localhost:8000/api/uploads/` */}
                      <img
                        className="rounded-2xl"
                        src={`http://localhost:8000/api/uploads/${Link}`}
                        alt="loading..."
                      />
                    </div>
                  ))}
                <label className="flex cursor-pointer justify-center border gap-1 justigy-center bg-transparent rounded-2xl p-8 text-center text-2xl text-gray-600 focus:outline-none  focus:border-purple-500">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  Upload
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </label>
                <div className="flex items-center justify-center mt-4">
                  <div className="flex items-center justify-center mt-4">
                    {photos.length > 0 &&
                      photos.map((photo, index) => (
                        <img
                          key={index}
                          className="w-32 h-24 object-cover rounded-md mr-4"
                          src={photo.preview}
                          alt={`Image ${index}`}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>

        <p className="text-gray-500 text-sm">About your Location...</p>
        <textarea
          className="focus:outline-none focus:border-primary"
          value={description}
          placeholder="Update description..."
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <p className="text-gray-500 text-sm">House rules, etc...</p>
        <textarea
          className="focus:outline-none focus:border-primary"
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          placeholder="Update Extra info"
        />
        <Perks selected={perks} onChange={setPerks} />
        <h2 className="text-2xl mt-4">Check in&out times</h2>
        <p className="text-gray-500 text-sm">
          place check in and out time , remember to clean the room before
          checkout
        </p>
        <div>
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              name="checkIn"
              className="focus:outline-none focus:border-primary"
              id="checkIn"
              placeholder=" Update Check in time (14:00)"
            />
          </div>
          <div>
            <input
              className="focus:outline-none focus:border-primary"
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              name="checkOut"
              id="checkOut"
              placeholder="Check out time"
            />
          </div>
          <div>
            <input
              className="focus:outline-none focus:border-primary"
              type="number"
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
              name="number"
              id="checkIn"
              placeholder="Max number of guests"
            />
          </div>
        </div>
        <div>
          <button className="primary my-4" onClick={UpdatePlace}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePlaceModal;
