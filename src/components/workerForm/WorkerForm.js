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
  const [team, setTeam] = useState(0);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [teamError, setTeamError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [text, setText] = useState();

  const ah = /^[ა-ჰ]+$/;

  const personInfo = { name, surname, email, team, position, phoneNumber };
  const submitHandler = () => {
    localStorage.setItem("personInfo", JSON.stringify(personInfo));
    if (!ah.test(`${name}`)) {
      setNameError("გთხოვთ შეიყვანეთ ქართული ასოებით");
    } else if (name.length < 2) {
      setNameError("მინიმუმ ორი ქართული ასო");
    } else if (!ah.test(`${surname}`)) {
      setSurnameError("გთხოვთ შეიყვანეთ ქართული ასოებით");
    } else if (surname.length < 2) {
      setSurnameError("მინიმუმ ორი ქართული ასო");
    } else if (!team) {
      setTeamError("error");
    } else if (!position) {
      setPositionError("error");
    } else if (email.split("@")[1] != "redberry.ge") {
      setEmailError("უნდა მთავრდებოდეს @redberry.ge");
    } else if (!phoneNumber.startsWith("+995")) {
      setPhoneNumberError("ნომერი უნდა იწყებოდეს +995 ით");
    } else if (phoneNumber.length < 13) {
      setPhoneNumberError("არ შეესაბამება ქართული ნომრის ფორმატს");
    } else if (phoneNumber.includes(" ")) {
      setPhoneNumberError("შეიყვანეთ ნომერი სფეისის გარეშე");
    } else {
      navigate("/laptopinfo");
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
  }, []);

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
      <div className="infoBody">
        <Link to="/">
          <button className="backButton left">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
        </Link>
        <div className="nav">
          <p className="navTitle">თანამშრომლის ინფო</p>
          <p className="navTitle">{text}</p>
        </div>
        {text && (
          <div className="navLine">
            <hr className="navLinehr"></hr>
            <hr></hr>
          </div>
        )}
        <div className="infobody">
          <div className="infoPerson">
            <div>
              {nameError ? (
                <p style={{ color: "#e52f2f", fontWeight: "bold" }}>სახელი</p>
              ) : (
                <p className="label">სახელი</p>
              )}
              <input
                type="text"
                className={nameError ? "inputError" : "input"}
                placeholder="გრიშა"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {nameError ? (
                <p className="label3" style={{ color: "#e52f2f" }}>
                  {nameError}
                </p>
              ) : (
                <p className="label3">მინიმუმ 2 სიმბოლო ქართული ასოებით</p>
              )}
            </div>
            <div>
              {surnameError ? (
                <p style={{ color: "#e52f2f", fontWeight: "bold" }}>გვარი</p>
              ) : (
                <p className="label">გვარი</p>
              )}

              <input
                type="text"
                className={surnameError ? "inputError" : "input"}
                placeholder="ბაგრატიონი"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              {surnameError ? (
                <p className="label3" style={{ color: "#e52f2f" }}>
                  {surnameError}
                </p>
              ) : (
                <p className="label3">მინიმუმ 2 სიმბოლო ქართული ასოებით</p>
              )}
            </div>
          </div>
          <div>
            <select
              onChange={(e) => setTeam(e.target.value)}
              className={teamError ? "selectError" : "select"}
            >
              <option disabled selected>
                თიმი
              </option>
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
              <option disabled selected>
                პოზიცია
              </option>
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
              <p className="label1" style={{ color: "#e52f2f" }}>
                ემაილი
              </p>
            ) : (
              <p className="label1">ემაილი</p>
            )}

            <input
              type="text"
              className={emailError ? "errorInput" : "input1"}
              value={email}
              placeholder="grisha666@redberry.ge"
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
              <p className="label1" style={{ color: "#e52f2f" }}>
                ტელეფონის ნომერი
              </p>
            ) : (
              <p className="label1">ტელეფონის ნომერი</p>
            )}

            <input
              type="text"
              className={phoneNumberError ? "errorInput" : "input1"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {phoneNumberError ? (
              <p className="label2" style={{ color: "#e52f2f" }}>
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
          <img
            className="footer"
            src={FooterIMG}
            alt="footer"
            style={{ bottom: "0" }}
          />
        </div>
      </div>
    </div>
  );
};
