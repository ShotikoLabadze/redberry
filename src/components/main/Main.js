import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.png";
import main from "../../assets/RedberryIMG.jpg";
import group from "../../assets/Group.png";
import { Link } from "react-router-dom";
import { useMediaQueries } from "@react-hook/media-query";

export const Main = () => {
  const [image, setImage] = useState("");
  const { matches } = useMediaQueries({
    screen: "screen",
    width: "(max-width: 390px)",
  });

  useEffect(() => {
    if (matches.width) {
      setImage(group);
    } else {
      setImage(main);
    }
  }, [matches.width, setImage, image]);

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="landing">
        <img src={image} alt="landinglogo" />
      </div>

      <div>
        <Link to="/WorkerForm">
          <button className="button">ჩანაწერის დამატება</button>
        </Link>
      </div>
      <div>
        <Link to="/laptoplist">
          {" "}
          <button className="button">ჩანაწერების სია</button>
        </Link>
      </div>
    </div>
  );
};
