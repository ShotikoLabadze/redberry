import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { BackButton } from "../backButton/BackButton";

export const LaptopInfoPage = () => {
  const [team, setTeam] = useState([]);
  const [position, setPosition] = useState([]);

  const [user, setUser] = useState({});
  const [laptop, setLaptop] = useState({});
  const [laptopCpu, setLaptopCpu] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const getLaptops = async () => {
      const data = await axios.get(
        `https://pcfy.redberryinternship.ge/api/laptop/${params.id}?token=58fb15a2289017f3c82b6d0949bbaf33`
      );

      setUser(data.data.data.user);
      setLaptop(data.data.data.laptop);
      setLaptopCpu(data.data.data.laptop.cpu);
      setLoading(false);
    };

    getLaptops();
  }, []);

  useEffect(() => {
    const getTeams = async () => {
      const { data } = await axios.get(
        "https://pcfy.redberryinternship.ge/api/teams"
      );
      setTeam(data.data);
    };
    const getPositions = async () => {
      const { data } = await axios.get(
        "https://pcfy.redberryinternship.ge/api/positions"
      );
      setPosition(data.data);
    };

    getTeams();
    getPositions();
  }, []);

  return (
    <div className="responsive">
      <BackButton />
      <p
        className="navTitle1"
        style={{ width: "20%", margin: "auto", marginTop: "40px" }}
      >
        ლეპტოპის ინფო
      </p>
      <div className="wrapper">
        <div className="column">
          <div className="product-wrap">
            <div>
              <img
                className="img-responsive"
                style={{
                  minHeight: "260px",
                  minWidth: "360px",
                  maxWidth: "360px",
                }}
                src={`https://pcfy.redberryinternship.ge${laptop.image}`}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="information">
          <div className="column1 label1">
            <p>სახელი:</p>
            <p>თიმი:</p>
            <p>პოზიცია:</p>
            <p>მეილი:</p>
            <p>ტელ. ნომერი:</p>
          </div>
          <div className="column1 label4">
            <p>
              {user.name} {user.surname}
            </p>
            {team.map((t) => {
              if (t.id === user.team_id) {
                return <p>{t.name}</p>;
              }
            })}
            {position.map((p) => {
              if (p.id === user.position_id) {
                return <p>{p.name}</p>;
              }
            })}
            <p>{user.email}</p>
            <p>{user.phone_number}</p>
          </div>
        </div>
      </div>
      <hr className="line" />

      <div className="wrapper">
        <div className="columnPhone">
          <div className="column">
            <div className="information">
              <div className="column1 label1">
                <p>ლეპტ. სახელი:</p>
                <p>ბრენდი:</p>
                <p>RAM:</p>
                <p>მეხსიერების ტიპი:</p>
              </div>
              <div className="column1 label4">
                <p>{laptop.name}</p>
                <p>{laptop.brand_id}</p>
                <p>{laptop.ram}</p>
                <p>{laptop.hard_drive_type}</p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="information">
              <div className="column1 label1">
                <p>CPU:</p>
                <p>CPU_ს ბირთვი:</p>
                <p>CPU_ს ნაკადი:</p>
              </div>
              <div className="column1 label4">
                <p>{laptopCpu.name}</p>
                <p>{laptopCpu.cores}</p>
                <p>{laptopCpu.threads}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="line" />

      <div className="wrapper">
        <div className="columnPhone">
          <div className="column">
            <div className="information">
              <div className="column1 label1">
                <p>ლეპტოპის მდგომარეობა:</p>
                <p>ლეპტოპის ფასი:</p>
              </div>
              <div className="column1 label4">
                {laptop.state === "used" ? <p>მეორადი</p> : <p>ახალი</p>}
                <p style={{ marginTop: "40px" }}>{laptop.price} ₾</p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="information">
              <div className="column1 label1">
                <p>შევსების რიცხვი:</p>
              </div>
              <div className="column1 label4">
                <p>{laptop.purchase_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
