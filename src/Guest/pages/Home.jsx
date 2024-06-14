import React from "react";

// import PlacesPage from "../../components/PlacesPage";
import CategoryLine from "../components/CategoryLine";
import Footer from "../pages/Footer";
import PlacesPage from "./PlacesPage";
import ImageSlider from "../components/ImageSlider";

export default function Home() {
  return (
    <>
      <ImageSlider />
      {/* Pass the searchQuery and setSearchQuery props to RecentAd */}
      <PlacesPage />
    </>
  );
}
