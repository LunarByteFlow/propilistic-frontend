//import routing
import { Route, Routes } from "react-router-dom";
import Chatbot from "../Guest/components/Chatbot";
import ContactUs from "../Guest/pages/ContactUs";
// import Navbar from "../Guest/components/Navbar";
import Navbar from "./components/Navbar";
import UserLoginPage from "./components/UserLoginPage";
import RegisterUser from "../Guest/pages/RegisterPage";
import PlaceDetails from "./components/PlaceDetails";
import Home from "../Guest/pages/Home";
import UserHome from "./components/UserHome";
// import Navigationbar from "../Guest/pages/Navigationbar";
import UserProfile from "./components/UserProfile";
import AddNewPlace from "../Guest/pages/AddNewPlace";
export default function User() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Home />
            </>
          }
        ></Route>
        <Route path="/my_profile" element={<UserProfile />} />

        <Route
          exact
          path="/postAnAdd"
          element={
            <>
              <AddNewPlace />
            </>
          }
        ></Route>

        <Route path="/getAdbyId/:_id" element={<PlaceDetails />} />
      </Routes>
    </>
  );
}
