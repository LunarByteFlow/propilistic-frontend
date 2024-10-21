import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { styled } from "styled-components";
import {
  Grid,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  makeStyles,
  TextField,
  Divider,
} from "@material-ui/core";
import {
  PlaceOutlined as LocationIcon,
  InfoOutlined as ExtraInfoIcon,
  HomeOutlined as AddressIcon,
  AccessTimeOutlined as CheckInOutIcon,
  PeopleOutlined as MaxGuestsIcon,
  CheckCircleOutlined as PerkIcon,
} from "@material-ui/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UpdatePlaceModal from "./UpdatePlaceModal";
// import { makeStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import { Carousel as MuiCarousel } from "@mui/material";
import "./defaultStyles.css";
import Footer from "../../Guest/pages/Footer";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    width: "88%",
    // borderRadius: theme.spacing(3),
    // boxShadow: theme.shadows[6],
    // padding: theme.spacing(2),
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    width:"40%",
    // margin:20,
    marginRight: theme.spacing(4),
  },
  title: {
    fontSize: "3rem",
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  subTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    fontSize: "1.5rem",
    color: theme.palette.secondary.main,
  },
  description: {
    marginBottom: theme.spacing(2),
    fontSize: "1.9rem",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  perkItem: {
    marginBottom: theme.spacing(1),
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  button: {
    marginTop: theme.spacing(4),
    fontSize: "1.5rem",
    padding: theme.spacing(2, 6),
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  reviewSection: {
    width: "50%",
    padding: theme.spacing(4),
  },
  reviewForm: {
    marginTop: theme.spacing(2),
  },
}));

const PlaceDetails = () => {
  const classes = useStyles();
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const { _id } = useParams();
  const [place, setPlace] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getAdbyId/${_id}`
        );
        setPlace(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching page details:", error);
        setError("Failed to fetch ad details");
        setLoading(false);
      }
    };

    fetchAdDetails();
  }, [_id]);

  const handleUpdatePlace = (updatedData) => {
    // Implement your API call logic here
    console.log("Updating place with data:", updatedData);
    // Call your update API or state update logic here
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.paper}>
            <Carousel infiniteLoop showArrows autoPlay interval={5000}>
              {place.photos.map((photo, index) => (
                <div key={index}>
                  <img
                    src={`https://propilistic-backend.vercel.app/uploads/${photo}`}
                    alt={`Slide ${index}`}
                    style={{ maxHeight: "650px" ,position:"cover"}} // Adjust the maxHeight to make the images smaller
                  />
                </div>
              ))}
            </Carousel>

            <Card className={classes.card}>
              <CardContent className={classes.details}>
                <Typography variant="h2" className={classes.title}>
                  {place.title}
                </Typography>
                <div className={classes.subTitle}>
                  <LocationIcon fontSize="inherit" />
                  <Typography variant="h4" gutterBottom>
                    Location, Maldives
                  </Typography>
                </div>
                <Typography variant="body1" className={classes.description}>
                  <strong>Description:</strong>{" "}
                  <span style={{ color: "#337CFF" }}>{place.description}</span>
                </Typography>
                <Typography variant="body1" className={classes.description}>
                  <strong>Extra Info:</strong>{" "}
                  <span style={{ color: "#5AFF33" }}>{place.extraInfo}</span>
                </Typography>
                <Typography variant="body1" className={classes.description}>
                  <strong>Address:</strong>{" "}
                  <span style={{ color: "#337CFF" }}>{place.address}</span>
                </Typography>
                <Typography variant="body1" className={classes.description}>
                  <strong>Check-in:</strong>{" "}
                  <span style={{ color: "#FF336A" }}>{place.checkIn}</span>
                </Typography>
                <Typography variant="body1" className={classes.description}>
                  <strong>Check-out:</strong>{" "}
                  <span style={{ color: "#33FFBD" }}>{place.checkOut}</span>
                </Typography>
                <Typography variant="body1" className={classes.description}>
                  <strong>Max Guests:</strong>{" "}
                  <span style={{ color: "#FFB533" }}>{place.maxGuest}</span>
                </Typography>
                <List>
                  <Typography variant="body1" className={classes.description}>
                    <strong>Perks Available:</strong>
                  </Typography>
                  {place.perks &&
                    place.perks.map((perk, index) => (
                      <Zoom
                        in={true}
                        key={index}
                        style={{ transitionDelay: index * 100 }}
                      >
                        <ListItem className={classes.perkItem}>
                          <PerkIcon fontSize="inherit" />{" "}
                          <ListItemText
                            primary={
                              <span style={{ color: "#33FFA8" }}>{perk}</span>
                            }
                          />
                        </ListItem>
                      </Zoom>
                    ))}
                </List>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => setUpdateModalOpen(true)}
                >
                  Update Place
                </Button>
              </CardContent>

              <CardContent className={classes.reviewSection}>
                <Typography variant="h4" gutterBottom>
                  Customer Reviews
                </Typography>
                <Divider />
                {/* Display reviews here */}
                <form className={classes.reviewForm}>
                  <Typography variant="h6" gutterBottom>
                    Leave a Review
                  </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Your Name"
                    name="name"
                    autoComplete="name"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="review"
                    label="Your Review"
                    name="review"
                    autoComplete="review"
                    multiline
                    rows={4}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <UpdatePlaceModal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setUpdateModalOpen(false)}
          onUpdatePlace={handleUpdatePlace}
        />
      </Grid>
      <Footer />
    </>
  );
};

export default PlaceDetails;
