import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import footerIMG from "../../assets/FooterIMG.png";
import { BackButton } from "../backButton/BackButton";

export const LaptopList = () => {
  const [loading, setLoading] = useState(true);
  const [laptop, setLaptop] = useState();

  useEffect(() => {
    const getLaptops = async () => {
      const data = await axios.get(
        "https://pcfy.redberryinternship.ge/api/laptops?token=6e411cdd00f5018ed76599c4c3c36bfc"
      );

      console.log();
      setLaptop(data.data.data);
      setLoading(false);
    };

    getLaptops();
  }, []);

  return (
    <div>
      <div className="infoBody1" style={{ backgroundColor: "white" }}>
        <BackButton />
        <div className="nav">
          <p className="navTitle1" style={{ marginBottom: "100px" }}>
            ჩანაწერების სია
          </p>
        </div>
        <div className="cardContainer">
          {loading ? (
            <p>loading</p>
          ) : (
            laptop.map((l) => (
              <div className="card">
                <div className="cardInfo">
                  <img
                    style={{
                      minHeight: "140px",
                      minWidth: "100%",
                      maxHeight: "140px",
                    }}
                    alt="laptop"
                    src={`https://pcfy.redberryinternship.ge${l.laptop.image}`}
                  ></img>
                </div>
                <div className="cardInfo">
                  <p
                    style={{
                      marginTop: "5px",
                      marginLeft: "5px",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {l.user.name} {l.user.surname}
                  </p>
                  <p
                    style={{
                      marginTop: "5px",
                      marginLeft: "5px",
                      fontSize: "16px",
                      fontWeight: "normal",
                    }}
                  >
                    {l.laptop.name}
                  </p>
                  <p>
                    <Link
                      style={{
                        marginTop: "5px",
                        marginLeft: "5px",
                        color: "#4d9ac3",
                        textDecoration: "underline",
                      }}
                      to={`/laptopinfo/${l.laptop.id}`}
                    >
                      მეტის ნახვა
                    </Link>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <img
            className="footer"
            src={footerIMG}
            alt="footer"
            style={{ bottom: "0" }}
          />
        </div>
      </div>
    </div>
  );
};
