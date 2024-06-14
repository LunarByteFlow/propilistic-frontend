import React from "react";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#1976d2", // Background color
    boxShadow: "none", // Remove the shadow
  },
  logo: {
    flexGrow: 1,
    fontSize: "1.8rem", // Adjust the font size
    fontWeight: "bold",
    color: "#fff", // Text color
    letterSpacing: "1px", // Adjust letter spacing
    transition: "color 0.3s", // Smooth color transition on hover
    "&:hover": {
      color: "#ff5722", // Change color on hover
    },
  },
  menuButton: {
    marginRight: "16px", // Adjust the spacing manually
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
  },
  navButton: {
    marginLeft: "16px", // Adjust the spacing manually
    borderRadius: "20px", // Adjust button border radius
    transition: "background-color 0.3s", // Smooth background color transition on hover
    "&:hover": {
      backgroundColor: "#ff5722", // Change background color on hover
    },
  },
}));

const Navbar1 = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h1" className={classes.logo}>
          Your Logo
        </Typography>
        <div className={classes.navLinks}>
          <Button color="inherit" className={classes.navButton}>
            Home
          </Button>
          <Button color="inherit" className={classes.navButton}>
            About
          </Button>
          <Button color="inherit" className={classes.navButton}>
            Services
          </Button>
          <Button color="inherit" className={classes.navButton}>
            Contact
          </Button>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar1;
