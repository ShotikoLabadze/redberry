import React from "react";
import LOGO from "../../assets/Logo.png";
import IMG from "../../assets/RedberryIMG.jpg";
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={LOGO} alt="LOGO" />
      </div>

      <div className="landing">
        <img src={IMG} alt="RedberryIMG" />
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
