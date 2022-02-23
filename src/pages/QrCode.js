import React from "react";

const QrCode = () => {
  return (
    <nav className="slideshow-container">
      <div
        className="mySlides fade"
        style={{ width: 100, height: 100, backgroundColor: "red" }}
      ></div>
      <div
        className="mySlides fade"
        style={{ width: 100, height: 100, backgroundColor: "blue" }}
      ></div>
      <div
        className="mySlides fade"
        style={{ width: 100, height: 100, backgroundColor: "yellow" }}
      ></div>
    </nav>
  );
};

export default QrCode;
