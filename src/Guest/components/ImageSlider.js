import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "100vh",
  objecttFit:"cover",
};
const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb3BlcnR5fGVufDB8fDB8fHww",
    // caption: "Slide 1",
  },
  {
    url: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb3BlcnR5fGVufDB8fDB8fHww",
    // caption: "Slide 2",
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    // caption: "Slide 3",
  },
];

const ImageSlider = () => {
  return (
    <>
      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              >
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </>
  );
};

export default ImageSlider;
