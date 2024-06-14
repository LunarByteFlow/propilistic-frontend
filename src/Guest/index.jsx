import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import UserLoginPage from "../User/components/UserLoginPage";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
// import PostAnAdd from '../User/pages/PostAnAdd'
import ContactUs from "./pages/ContactUs";
// import AddDetails from '../User/pages/AddDetails'
import RegisterPage from "./pages/RegisterPage";
import PlacesPage from "./pages/PlacesPage";
import AddCard from "./pages/AddCard";
import AddNewPlace from "./pages/AddNewPlace";
import RegisterUser from "./components/CustomForm/RegisterUser";
import PlaceDetails from "../User/components/PlaceDetails";
import Navbar1 from "./components/Navbar1";
import Footer from "./pages/Footer";

//                            MT WORK
// import ChatForm from '../User/components/ChatForm'

export default function Guest() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/recent_property_adds" element={<PlacesPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/postadd" element={<AddNewPlace />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/add/:_id" element={<AddCard />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<UserLoginPage />} />

        <Route path="/getAdbyId/:_id" element={<PlaceDetails />} />

        {/* <Route path="/chat" element={<ChatForm/>}/> */}
      </Routes>
      
    </>
  );
}
