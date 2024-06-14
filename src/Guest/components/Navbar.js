import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { logincontext } from "../../GlobalContext/context";
import Swal from "sweetalert2";
import "../../User/components/defaultStyles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#000",
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    textDecoration:"none",
    marginTop:"10px",
    fontSize: "1.7rem", // Set the desired font size here
    fontWeight:"bold",
    marginLeft:"8px",
  },
  list: {
    width: 250,
  },
  drawerPaper: {
    backgroundColor: "#333", // Change to your desired color
    color: "#fff",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    paddingTop: "5px",
    fontSize: "5.5rem",
  },
  appBar: {
    top: 0, // Position the app bar at the top
    left: 0, // Align with the left side
    right: 0, // Align with the right side
    position: "fixed", // Make it sticky
    zIndex: theme.zIndex.drawer + 1, // Ensure it's above the drawer
    backgroundColor: "black",
    height: "10vh",
  },
  Typography: {
    linkStyle: "none",
  },
  button: {
    marginTop:"10px",
    fontSize: "1.3rem", // Set the desired font size here
    fontWeight:"bold",
    marginLeft:"5px",
  },
}));

const Navbar = () => {
  const { state, dispatch } = useContext(logincontext);
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            className={classes.title}
            component={Link}
            color="inherit"
            linkStyle="none"
            to="/"
          >
            air-bnb
          </Typography>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            classes={{ paper: classes.drawerPaper }}
          >
            <div
              className={classes.list}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                {[
                  "Link 1",
                  "Link 2",
                  "Link 3",
                  "Add a New Listing",
                  "My Profile",
                ].map((text, index) => (
                  <ListItem
                    button
                    key={index}
                    component={Link}
                    to="/postadd"
                    className={classes.link}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
          <Button color="inherit" component={Link} to="/login" className={classes.button} >
            login
          </Button>
          <Button color="inherit" component={Link} to="/register" className={classes.button} >
            sign up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
