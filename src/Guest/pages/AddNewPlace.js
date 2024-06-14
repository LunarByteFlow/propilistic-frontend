import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
// import LoadingSpinner from "../../user/components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
// import SuccessModal from "../../user/components/SuccessModal";
// import "./SuccessModal.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ImageUploader from "../components/ImageUploader";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import "./addplace_form.css";
import Footer from "./Footer";
import { Typography } from "@material-ui/core";

const StyledBox = styled(Box)({
  border: "1px solid #ccc", // Add border to the container
  borderRadius: "5px", // Add border radius for a rounded look
  padding: "20px", // Add padding for spacing inside the border
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  title: {},
  width: "100%", // Set width to 100% to span the entire container
  // margin: "10px auto", // Adjust margin as needed
  fontWeight: "bold",
  color: "red",
  fontSize: "1.9rem",
  "& input": {
    fontSize: "1.4rem", // Set font size of input text
  },
  "& input::placeholder": {
    fontSize: "1.5rem", // Set font size of placeholder text
  },
  "& .MuiOutlinedInput-notchedOutline": {
    fontSize: "1.9rem",
    borderWidth: "2px", // Adjust border width of the outline
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    fontSize: "1.9rem",
    borderWidth: "2px", // Adjust border width of the outline on hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    fontSize: "1.9rem",
    borderWidth: "2px", // Adjust border width of the outline when focused
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.4rem", // Adjust the font size of the label here
    // paddingTop:"15px"
  },
}));

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop:"6rem",
    margin: "auto", // Center horizontally
    marginBottom:"2rem",
    paddingTop: theme.spacing(2), // Add padding
    fontSize: "2.5rem", // Increase font size
    fontWeight: "bold",
    color: "#333", // Change text color
    textAlign: "center", // Center text
    borderRadius: theme.spacing(2), // Add border radius
  },
}));

const AddNewPlace = () => {
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
  const [input_done, setInputDone] = useState(false);
  const classes = useStyles();

  let navigate = useNavigate();
  const validateForm = () => {
    // Example validation checks
    if (title.length < 7 || title.length > 15) {
      return false;
    }
    if (
      description.split(/\s+/).filter(Boolean).length < 50 ||
      description.split(/\s+/).filter(Boolean).length > 150
    ) {
      return false;
    }
    if (extraInfo.split(/\s+/).filter(Boolean).length < 20) {
      return false;
    }
    // Add more validation checks as needed
    return true;
  };
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

  const placeNewPlace = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please check your form inputs.",
      });
    }

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
        `http://localhost:8000/api/places`,
        placesData
      );

      setSuccess(true);
      console.log("Response from server:", response.data);
      // Navigate after the request is successful
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully Posted Your Add",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Error placeing new place:", error);
      // Handle errors here if necessary
    }
  };

  return (
    <>
      <Typography className={classes.title}>Post A New property Add</Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: "80%",
          margin: "10px auto",
          marginTop: "5.8rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack spacing={2}>
          <Item>
            {/* <h1>Title</h1> */}
            <StyledTextField
              fullWidth
              id="standard-multiline-static"
              label="Enter a title (e.g., My Lovely Apartment)"
              variant="standard"
              type="text"
              color="success"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              helperText={
                input_done &&
                !validateForm() &&
                "Title must be between 7 and 15 characters"
              }
              required
              onFocus={() => setInputDone(true)}
            />
          </Item>
          <Item>
            <StyledTextField
              fullWidth
              id="outlined-basic"
              label="Address Of the location"
              variant="standard"
              type="text"
              value={address}
              onChange={(ev) => setAddres(ev.target.value)}
              required
              onFocus={() => setInputDone(true)}
              // placeholder="Enter The Adress of the place available "
            />
          </Item>
          <Item>
            <StyledTextField
              id="outlined-basic"
              label="Some Description"
              variant="standard"
              fullWidth
              // multiline
              maxRows={5}
              value={description}
              // placeholder="Enter description"
              onChange={(ev) => setDescription(ev.target.value)}
              helperText={
                input_done &&
                !validateForm() &&
                "Enter a Long description (50 to 100 words)"
              }
              required
              onFocus={() => setInputDone(true)}
              focus
            />
          </Item>
          <Item>
            <StyledTextField
              fullWidth
              id="outlined-basic"
              label="Extra Information"
              variant="standard"
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
              required
              focus
            />
          </Item>
          <Item>
            <StyledTextField
              fullWidth
              // id="outlined-basic"
              label="Time For Check In"
              variant="standard"
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="eg: (14:00)"
              name="checkIn"
              id="checkIn"
              // placeholder="Enter The Adress of the place available "
            />
          </Item>
          <Item>
            <StyledTextField
              fullWidth
              // id="outlined-basic"
              label="TIme for Check out"
              variant="standard"
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              name="checkOut"
              id="checkOut"
            />
          </Item>
          <Item>
            <StyledTextField
              fullWidth
              // id="outlined-basic"
              label="Number Of Guests"
              variant="standard"
              type="number"
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
              name="number"
              id="number"
            />
          </Item>

          <Perks selected={perks} onChange={setPerks} />
          <ImageUploader
            photos={photos}
            handleImageChange={handleImageChange}
          />

          <button contained className="button my-4" onClick={placeNewPlace}>
            Add a new Property
          </button>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};
// <FormContainer>
//   <div>
//     <div className="mb-4">
//       <Heading>Title</Heading>
//       <input
//         type="text"
//         value={title}
//         onChange={(ev) => setTitle(ev.target.value)}
//         placeholder="Enter a title (e.g., My Lovely Apartment)"
//         className="w-full py-2 px-3 border rounded focus:outline-none focus:border-purple-500"
//         required
//       />
//     </div>

//     <div className="mb-4">
//       <Heading>Add Address</Heading>
//       <input
//         type="text"
//         value={address}
//         onChange={(ev) => setAddres(ev.target.value)}
//         placeholder="Enter the placeress"
//         className="w-full py-2 px-3 border rounded focus:outline-none focus:border-primary"
//       />
//     </div>
//     <div>
//       <>
//         <div className="mb-4">
//           <Heading>
//             <h1 className="text-2xl font-semibold">Photos</h1>
//             <p className="text-gray-600">
//               place photos for a better experience.
//             </p>
//           </Heading>

//           <div className=" mt-2 grid w-full gap-2  ">
//             {photoLink.length > 0 &&
//               photoLink.map((Link) => (
//                 <div key={Link}>
//                   {/* `http://localhost:8000/api/uploads/` */}
//                   <img
//                     className="rounded-2xl"
//                     src={`http://localhost:8000/api/uploads/${Link}`}
//                     alt="loading..."
//                   />
//                 </div>
//               ))}
//             <UploadLabel htmlFor="file-upload">
//               Upload
//               <UploadInput
//                 id="file-upload"
//                 type="file"
//                 multiple
//                 onChange={handleImageChange}
//               />
//               <UploadIcon
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
//                 />
//               </UploadIcon>
//             </UploadLabel>
//             <div className="flex items-center justify-center mt-4">
//               <div className="flex items-center justify-center mt-4">
//                 {photos.length > 0 &&
//                   photos.map((photo, index) => (
//                     <img
//                       key={index}
//                       className="w-32 h-24 object-cover rounded-md mr-4"
//                       src={photo.preview}
//                       alt={`Image ${index}`}
//                     />
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     </div>
//     <Heading>
//       <h1 className="text-2xl mt-4">Enter Description</h1>
//       <p className="text-gray-500 text-sm">About your Location...</p>
//     </Heading>

//     <textarea
//       className="focus:outline-none focus:border-primary"
//       value={description}
//       placeholder="Enter description"
//       onChange={(ev) => setDescription(ev.target.value)}
//     />

//     <Heading>Any Extra Information</Heading>
//     <textarea
//       className="focus:outline-none focus:border-primary"
//       value={extraInfo}
//       onChange={(ev) => setExtraInfo(ev.target.value)}
//     />
//     <Perks selected={perks} onChange={setPerks} />
//     <Heading>
//       <h2 className="text-2xl mt-6 text-center">Check in&out times</h2>
//       <p className="text-gray-500 text-sm text-center">
//         place check in and out time , remember to clean the room before
//         checkout
//       </p>
//     </Heading>
//     <div>
//       <div>
//         <Heading>
//           <h3 className="mt-2 -mb-1 text-3xl">Check in time</h3>
//         </Heading>
//         <input
//           type="text"
//           value={checkIn}
//           onChange={(ev) => setCheckIn(ev.target.value)}
//           placeholder="14:00"
//           name="checkIn"
//           id="checkIn"
//         />
//       </div>
//       <div>
//         <Heading>
//           <h3 className="mt-2 -mb-1 text-3xl">Check out time</h3>
//         </Heading>
//         <input
//           className="focus:outline-none focus:border-primary"
//           type="text"
//           value={checkOut}
//           onChange={(ev) => setCheckOut(ev.target.value)}
//           name="checkOut"
//           id="checkOut"
//         />
//       </div>
//       <div>
//         <h3 className="mt-2 -mb-1">Max number of guests</h3>
//         <input
//           className="focus:outline-none focus:border-primary"
//           type="number"
//           value={maxGuest}
//           onChange={(ev) => setMaxGuest(ev.target.value)}
//           name="number"
//           id="checkIn"
//         />
//       </div>
//     </div>
//     <div>
//       <button className="primary my-4" onClick={placeNewPlace}>
//         Add a new Property
//       </button>
//     </div>

//     {/* {success && <SuccessModal closeModal={() => setSuccess(false)} />} */}
//   </div>
// </FormContainer>

export default AddNewPlace;
