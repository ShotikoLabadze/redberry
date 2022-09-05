import React from "react";
import { useNavigate } from "react-router-dom";
import Vector from "../../assets/Vector.svg";
import "./BackButton.css";

export const BackButton = () => {
  let navigate = useNavigate();
  return (
    <>
      <button className="BackButton" onClick={() => navigate(-1)}>
        <img src={Vector} alt="vector" />
      </button>
    </>
  );
};
