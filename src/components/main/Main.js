import React from "react";
import IMG from "../../assets/RedberryIMG.jpg";
import { Link } from "react-router-dom";
import "./Main.css";

export const Main = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={IMG} alt="LOGO" />
      </div>

      <div>
        <Link to="/WorkerForm">
          <button className="button">ჩანაწერის დამატება</button>
        </Link>
      </div>

      <div>
        <Link to="/LaptopList">
          <button className="button">ჩანაწერების სია</button>
        </Link>
      </div>
    </div>
  );
};
