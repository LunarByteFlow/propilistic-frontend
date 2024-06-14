import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
// import LoadingSpinner from "../../user/components/LoadingSpinner";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import AddNewPlace from "./AddNewPlace";
import AddCard from "./AddCard";

import {
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";

import Footer from "./Footer";

const PlacesPage = () => {
  const { action } = useParams();
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
  const [placeetails, setplaceetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);
  const [progress, setProgress] = useState(0);
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

  const placeNewPlace = async () => {
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
      navigate("account/places");
    } catch (error) {
      console.error("Error placeing new place:", error);
      // Handle errors here if necessary
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getAllplaces"
        );
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
        // Handle errors here if necessary
      }
      setLoading(false);
    };

    fetchPlaces();
  }, []); // Run the effect only once on component mount

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        {action === "new" && <AddNewPlace />}

        <Typography variant="h3" component="h1" gutterBottom>
          PROPERTY LISTINGS
        </Typography>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          </div>
        ) : (
          <Grid container spacing={3}>
            {places.map((place) => (
              <Grid item key={place._id} xs={12} >
                <AddCard place={place} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer/>
    </>
  );
};

export default PlacesPage;
