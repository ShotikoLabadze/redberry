import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterIMG from "../../assets/FooterIMG.png";
import axios from "axios";
import "./WorkerForm.css";

export const WorkerForm = () => {
  const navigate = useNavigate();
  const [teamsInfo, setTeamsInfo] = useState([]);
  const [positionInfo, setPositionInfo] = useState([]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState(0);
  const [position, setPosition] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [teamError, setTeamError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const res = /^[ა-ჰ]+$/;

  const personInfo = { name, surname, email, team, position, phoneNumber };
  const submitHandler = () => {
    localStorage.setItem("personInfo", JSON.stringify(personInfo));
    if (!res.test(`${name}`)) {
      setNameError("გთხოვთ შეიყვანეთ ქართული ასოებით");
    } else if (name.length < 2) {
      setNameError("მინიმუმ ორი ქართული ასო");
    } else if (!res.test(`${surname}`)) {
      setSurnameError("გთხოვთ შეიყვანეთ ქართული ასოებით");
    } else if (surname.length < 2) {
      setSurnameError("მინიმუმ ორი ქართული ასო");
    } else if (!team) {
      setTeamError("error");
    } else if (!position) {
      setPositionError("error");
    } else if (email.split("@")[1] !== "redberry.ge") {
      setEmailError("უნდა მთავრდებოდეს @redberry.ge");
    } else if (!phoneNumber.startsWith("+995")) {
      setPhoneNumberError("ნომერი უნდა იწყებოდეს +995 ით");
    } else if (phoneNumber.length < 13) {
      setPhoneNumberError("არ შეესაბამება ქართული ნომრის ფორმატს");
    } else {
      navigate("/LaptopInfo");
    }
  };

  useEffect(() => {
    const getTeams = async () => {
      const { data } = await axios.get(
        "https://pcfy.redberryinternship.ge/api/teams"
      );
      setTeamsInfo(data.data);
    };

    const getPositions = async () => {
      const { data } = await axios.get(
        "https://pcfy.redberryinternship.ge/api/positions"
      );
      setPositionInfo(data.data);
    };
    getTeams();
    getPositions();
  }, [setPositionInfo]);

  useEffect(() => {
    const getPerson = JSON.parse(localStorage.getItem("personInfo"));
    if (getPerson) {
      setName(getPerson.name);
      setSurname(getPerson.surname);
      setEmail(getPerson.email);
      setTeam(getPerson.team);
      setPosition(getPerson.position);
      setPhoneNumber(getPerson.phoneNumber);
    }
  }, []);

  return (
    <div>
      <div className="">
        <Link to="/">
          <button className="">
            <i class=""></i>
          </button>
        </Link>
        <div className="">
          <p className="">თანამშრომლის ინფო</p>
          <p className="">ლეპტოპის მახასიათებლები</p>
        </div>
        <div className="">
          <div className="">
            <div>
              {nameError ? (
                <p style={{ color: "#e52f2f", fontWeight: "bold" }}>სახელი</p>
              ) : (
                <p className="">სახელი</p>
              )}
              <input
                type="text"
                className={nameError ? "inputError" : ""}
                placeholder="გრიშა"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError ? (
                <p className="" style={{ color: "#e52f2f" }}>
                  {nameError}
                </p>
              ) : (
                <p className="">მინიმუმ 2 სიმბოლო ქართული ასოებით</p>
              )}
            </div>
            <div>
              {surnameError ? (
                <p style={{ color: "#e52f2f", fontWeight: "bold" }}>გვარი</p>
              ) : (
                <p className="">გვარი</p>
              )}

              <input
                type="text"
                className={surnameError ? "inputError" : "input"}
                placeholder="ბაგრატიონი"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              {surnameError ? (
                <p className="" style={{ color: "#e52f2f" }}>
                  {surnameError}
                </p>
              ) : (
                <p className="">მინიმუმ 2 სიმბოლო ქართული ასოებით</p>
              )}
            </div>
          </div>
          <div>
            <select
              onChange={(e) => setTeam(e.target.value)}
              className={teamError ? "selectError" : "select"}
            >
              {" "}
              <option disabled>თიმი</option>
              {teamsInfo.map((team) => (
                <option value={team.id} key={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className={positionError ? "selectError" : "select"}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option disabled>პოზიცია</option>
              {positionInfo
                .filter((position) => position.team_id == team)
                .map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            {emailError ? (
              <p className="" style={{ color: "#e52f2f" }}>
                ემაილი
              </p>
            ) : (
              <p className="">ემაილი</p>
            )}

            <input
              type="text"
              className={emailError ? "errorInput" : ""}
              value={email}
              placeholder="grish666@redberry.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError ? (
              <p className="errorLabel">{emailError}</p>
            ) : (
              <p className="label2">უნდა მთავრდებოდეს @redberry.ge</p>
            )}
          </div>
          <div>
            {phoneNumberError ? (
              <p className="" style={{ color: "#e52f2f" }}>
                ტელეფონის ნომერი
              </p>
            ) : (
              <p className="">ტელეფონის ნომერი</p>
            )}

            <input
              type="text"
              className={phoneNumberError ? "errorInput" : ""}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {phoneNumberError ? (
              <p className="" style={{ color: "#e52f2f" }}>
                {phoneNumberError}
              </p>
            ) : (
              <p className="label2">
                უნდა აკმაყოფილებდეს ქართული ნომრის ფორმატს
              </p>
            )}
          </div>

          <button onClick={submitHandler} className="button1">
            შემდეგი
          </button>
        </div>
        <div>
          <img className="" src={FooterIMG} style={{ bottom: "0" }} />
        </div>
      </div>
    </div>
  );
};
