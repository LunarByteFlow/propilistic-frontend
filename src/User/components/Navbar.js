// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { UserContext } from "../userContext";
// import styled from "styled-components";
// import { logincontext } from "../../GlobalContext/context";
// import Swal from 'sweetalert2'

// // Styled components
// const StyledHeader = styled.header`
//   padding: 1rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #fff;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   position: sticky;
//   top: 0;
//   z-index: 1000;
// `;

// const LogoContainer = styled(Link)`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   text-decoration: none;
//   color: inherit;
//   /* width:10vw;
//   height:10vh; */
// `;

// const Logo = styled.span`
//   font-weight: bold;
//   font-size: 1.5rem;
//   width:10vw;

// `;

// const LinksContainer = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const LinkButton = styled(Link)`
//   background-color: #3182ce;
//   color: white;
//   border: none;
//   border-radius: 0.5rem;
//   padding: 0.5rem 1rem;
//   text-decoration: none;
// `;

// const Links = styled.ul`
//   list-style: none;
//   padding: 10;
//   margin: 10;
//   display: flex;
//   gap: 1rem;
// `;

// const LinkItem = styled.li`
//   font-size: 1rem;
// `;

// const NavLink = styled(Link)`
//   text-decoration: none;
//   color: #333;
//   padding: 0.5rem 1rem;
//   border-radius: 0.5rem;
//   transition: background-color 0.3s ease;
//   font-size: 1.2rem;
//   font-weight: bold;

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

// const LogoutButton = styled.button`
//   padding: 10px;
//   margin: 10px;
//   border: 1px solid black;
//   border-radius: 5px;
//   color: white;
//   background: black;
//   font-size: 1.1rem;
//   cursor: pointer;
//   &:hover {
//     background-color: #333;
//     border-color: #222;
//   }
// `;

// // Navbar component
// const Navbar = () => {
//   const { state, dispatch } = useContext(logincontext);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Logout logic (e.g., clear cookies, tokens, user data)
//         dispatch({ type: 'LOGOUT' }); // Dispatch logout action only on confirmation
//         Swal.fire('Successfully Logged Out!', '', 'success'); // Informative success message
//       } else {
//         Swal.fire('Continue Exploring',); // Informative cancellation message
//       }
//     });
//   };
//   return (
//     <StyledHeader>
//       <LogoContainer to="/">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           className="w-8 h-8 -rotate-90"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
//           />
//         </svg>
//         <Logo>air-bnb</Logo>
//       </LogoContainer>
//       <LinksContainer>
//         <Links>
//           <LinkItem>
//             <NavLink to="#">link 1</NavLink>
//           </LinkItem>
//           <LinkItem>
//             <NavLink to="#">link 2</NavLink>
//           </LinkItem>
//           <LinkItem>
//             <NavLink to="#">link 3</NavLink>
//           </LinkItem>
//           <LinkItem>
//             <NavLink to="/postAnAdd">Add A new Listing</NavLink>
//           </LinkItem>
//           <LinkItem>
//             <NavLink to="/my_profile">My Profile</NavLink>
//           </LinkItem>
//           <LinkItem></LinkItem>
//         </Links>
//         <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
//         <LogoutButton >Post An Add</LogoutButton>

//       </LinksContainer>
//     </StyledHeader>
//   );
// };

// export default Navbar;
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
import "./defaultStyles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:"#000"
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
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
    paddingTop:"5px",
    fontSize:"5.5rem"
  },
  appBar: {
    top: 0, // Position the app bar at the top
    left: 0, // Align with the left side
    right: 0, // Align with the right side
    position: "fixed", // Make it sticky
    zIndex: theme.zIndex.drawer + 1, // Ensure it's above the drawer
    backgroundColor: "black", 
    height:"10vh"
  },
  Typography: {
    linkStyle:"none",
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

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        // Logout logic (e.g., clear cookies, tokens, user data)
        dispatch({ type: "LOGOUT" }); // Dispatch logout action only on confirmation
        Swal.fire("Successfully Logged Out!", "", "success"); // Informative success message
      } else {
        Swal.fire("Continue Exploring"); // Informative cancellation message
      }
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky"  className={classes.appBar} >
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
                    to="#"
                    className={classes.link}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
          <Button color="inherit" component={Link} to="/postAnAdd">
            Post an Add
          </Button>
          <Button color="inherit" component={Link} to="/my_profile">
            My Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
