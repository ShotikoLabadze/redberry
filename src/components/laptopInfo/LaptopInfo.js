import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import frame from "../../assets/Congratulations.png";
import footerIMG from "../../assets/FooterIMG.png";
import Modal from "react-modal";
import { BackButton } from "../backButton/BackButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minHeight: "400px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
};
export const LaptopInfo = () => {
  const [cpuInfo, setCpuInfo] = useState([]);
  const [brandInfo, setBrandInfo] = useState([]);

  const [file, setFile] = useState(null);
  const [laptopName, setLaptopName] = useState("");
  const [laptopBrand, setLaptopBrand] = useState("");
  const [laptopCpu, setLaptopCpu] = useState("");
  const [laptopCpuCore, setLaptopCpuCore] = useState(0);
  const [laptopCpuStream, setLaptopCpuStream] = useState(0);
  const [laptopRam, setLaptopRam] = useState(0);
  const [laptopMemoryType, setLaptopMemoryType] = useState("");
  const [laptopDate, setLaptopDate] = useState("");
  const [laptopPrice, setLaptopPrice] = useState(0);
  const [laptopCondition, setLaptopCondition] = useState("");
  const inputRef = useRef();
  const token = "58fb15a2289017f3c82b6d0949bbaf33";
  const [modalIsOpen, setIsOpen] = useState(false);

  const [fileError, setFileError] = useState(null);
  const [laptopNameError, setLaptopNameError] = useState("");
  const [laptopBrandError, setLaptopBrandError] = useState("");
  const [laptopCpuError, setLaptopCpuError] = useState("");
  const [laptopCpuCoreError, setLaptopCpuCoreError] = useState(0);
  const [laptopCpuStreamError, setLaptopCpuStreamError] = useState(0);
  const [laptopRamError, setLaptopRamError] = useState(0);
  const [laptopMemoryTypeError, setLaptopMemoryTypeError] = useState("");
  const [laptopPriceError, setLaptopPriceError] = useState(0);
  const [laptopConditionError, setLaptopConditionError] = useState("");

  const nameRegex = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-" +"]+$/;

  const laptopDetails = {
    laptopName,
    laptopBrand,
    laptopCpu,
    laptopCpuCore,
    laptopCpuStream,
    laptopRam,
    laptopMemoryType,
    laptopDate,
    laptopPrice,
    laptopCondition,
    file,
  };

  useEffect(() => {
    const laptopInfo = JSON.parse(localStorage.getItem("laptopInfo"));
    if (laptopInfo) {
      setLaptopName(laptopInfo.laptopName);
      setLaptopBrand(laptopInfo.laptopBrand);
      setLaptopCpu(laptopInfo.laptopCpu);
      setLaptopCpuCore(laptopInfo.laptopCpuCore);
      setLaptopRam(laptopInfo.laptopRam);
      setLaptopCpuStream(laptopInfo.laptopCpuStream);
      setLaptopMemoryType(laptopInfo.laptopMemoryType);
      setLaptopDate(laptopInfo.laptopDate);
      setLaptopPrice(laptopInfo.laptopPrice);
      setLaptopCondition(laptopInfo.laptopCondition);
    }
  }, []);

  useEffect(() => {
    const getCpu = async () => {
      const { data } = await axios.get(
        "https://pcfy.redberryinternship.ge/api/cpus"
      );
      setCpuInfo(data.data);
    };
    const getBrands = async () => {
      const { data } = await axios.get(
        "https://pcfy.redberryinternship.ge/api/brands"
      );
      setBrandInfo(data.data);
    };

    getBrands();
    getCpu();
  }, []);

  const submitHandler = () => {
    const personInfo = JSON.parse(localStorage.getItem("personInfo"));
    localStorage.setItem("laptopInfo", JSON.stringify(laptopDetails));
    const { name, surname, email, team, position, phoneNumber } = personInfo;

    if (!file) {
      setFileError("error");
    } else if (!nameRegex.test(`${laptopName}`)) {
      setLaptopNameError("რიცხვი, ლათინური ასოები და სპეციალური სიმბოლოები");
    } else if (!laptopBrand) {
      setLaptopBrandError("error");
    } else if (!laptopCpu) {
      setLaptopCpuError("error");
    } else if (isNaN(laptopCpuCore) || laptopCpuCore === 0) {
      setLaptopCpuCoreError("error");
    } else if (isNaN(laptopCpuStream) || laptopCpuStream === 0) {
      setLaptopCpuStreamError("error");
    } else if (isNaN(laptopRam) || laptopRam === 0) {
      setLaptopRamError("error");
    } else if (!laptopMemoryType) {
      setLaptopMemoryTypeError("error");
    } else if (isNaN(laptopPrice) || laptopPrice === 0) {
      setLaptopPriceError("error");
    } else if (!laptopCondition) {
      setLaptopConditionError("error");
    } else {
      axios({
        method: "post",
        url: "https://pcfy.redberryinternship.ge/api/laptop/create",
        data: {
          name,
          surname,
          email,
          team_id: team,
          position_id: position,
          phone_number: phoneNumber,
          laptop_name: laptopName,
          laptop_brand_id: laptopBrand,
          laptop_cpu: laptopCpu,
          laptop_cpu_cores: laptopCpuCore,
          laptop_cpu_threads: laptopCpuStream,
          laptop_ram: laptopRam,
          laptop_hard_drive_type: laptopMemoryType,
          laptop_price: laptopPrice,
          laptop_state: laptopCondition,
          laptop_image: file,
          laptop_purchase_date: laptopDate,
          token,
        },
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function(response) {
          setIsOpen(true);
          localStorage.removeItem("laptopInfo");
          localStorage.removeItem("personInfo");
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  };

  console.log(file);

  return (
    <div>
      <div className="infoBody1">
        <BackButton />
        <div className="nav" style={{ marginTop: "70px" }}>
          <p className="navTitle">თანამშრომლის ინფო</p>

          <p className="navTitle">ლეპტოპის მახასიათებლები</p>
        </div>
        <div className="navLine1">
          <hr></hr>
          <hr className="navLinehr1"></hr>
        </div>
        <div className="infobody1">
          <div className="infoPerson">
            <div className={fileError ? "fileError" : "file"}>
              {fileError && (
                <i
                  class="fa-solid fa-triangle-exclamation fa-2x"
                  style={{ color: "#c8cb52", marginTop: "20px" }}
                ></i>
              )}
              {file ? (
                <img
                  style={{
                    minWidth: "100px",
                    maxWidth: "100px",
                    maxHeight: "100px",
                    border: "1px solid white",
                    borderRadius: "10px",
                  }}
                  src={URL.createObjectURL(file)}
                />
              ) : (
                <div>
                  <p className={fileError ? "laptopFileError" : "laptopFile"}>
                    ჩააგდე ან ატვირთე
                  </p>
                  <p className={fileError ? "laptopFileError" : "laptopFile"}>
                    {" "}
                    ლეპტოპის ფოტო
                  </p>
                </div>
              )}
              <label for="file-upload" class="fileAppearance">
                ატვირთე
              </label>
              <input
                id="file-upload"
                accept="image/*"
                type="file"
                onChange={() => setFile(inputRef.current.files[0])}
                ref={inputRef}
              />
            </div>
          </div>
          <div className="infoPerson">
            <div>
              {laptopNameError ? (
                <p className="label" style={{ color: "#e52f2f" }}>
                  ლეპტოპის სახელი
                </p>
              ) : (
                <p className="label">ლეპტოპის სახელი</p>
              )}

              <input
                type="text"
                className={laptopNameError ? "inputError" : "input"}
                placeholder="HP"
                value={laptopName}
                onChange={(e) => setLaptopName(e.target.value)}
              />
              {laptopNameError ? (
                <p className="label3" style={{ color: "#e52f2f" }}>
                  {laptopNameError}
                </p>
              ) : (
                <p className="label3">
                  მხოლოდ ლათინურ სიმბოლოებს "!@#$%^&*()_+="
                </p>
              )}
            </div>
            <div>
              <select
                className={laptopBrandError ? "select1Error" : "select1"}
                onChange={(e) => setLaptopBrand(e.target.value)}
              >
                <option disabled selected>
                  ლეპტოპის ბრენდი
                </option>
                {brandInfo.map((brandItem) => (
                  <option value={brandItem.id} key={brandItem.id}>
                    {brandItem.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="line" />

          <div class="laptopInfo">
            <div>
              <select
                className={
                  laptopCpuError ? "laptopInfoSelectError" : "laptopInfoSelect"
                }
                onChange={(e) => setLaptopCpu(e.target.value)}
              >
                <option disabled selected>
                  CPU
                </option>
                {cpuInfo.map((item) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {laptopCpuCoreError ? (
                <p className="label" style={{ color: "red" }}>
                  CPU-ს ბირთვი
                </p>
              ) : (
                <p className="label">CPU-ს ბირთვი</p>
              )}
              <input
                type="text"
                className={
                  laptopCpuCoreError
                    ? "laptopInfoInputError"
                    : "laptopInfoInput"
                }
                value={laptopCpuCore}
                placeholder="0"
                onChange={(e) => setLaptopCpuCore(e.target.value)}
              />
              {laptopCpuCoreError ? (
                <p className="label3" style={{ color: "red" }}>
                  მხოლოდ ციფრები
                </p>
              ) : (
                <p className="label3">მხოლოდ ციფრები</p>
              )}{" "}
            </div>
            <div>
              {laptopCpuStreamError ? (
                <p className="label" style={{ color: "red" }}>
                  CPU-ს ნაკადი
                </p>
              ) : (
                <p className="label">CPU-ს ნაკადი</p>
              )}
              <input
                type="text"
                className={
                  laptopCpuStreamError
                    ? "laptopInfoInputError"
                    : "laptopInfoInput"
                }
                value={laptopCpuStream}
                placeholder="0"
                onChange={(e) => setLaptopCpuStream(e.target.value)}
              />
              {laptopCpuStreamError ? (
                <p className="label3" style={{ color: "red" }}>
                  მხოლოდ ციფრები
                </p>
              ) : (
                <p className="label3">მხოლოდ ციფრები</p>
              )}
            </div>
          </div>

          <div class="laptopInfoSecondRow">
            <div>
              {laptopRamError ? (
                <p className="label" style={{ color: "red" }}>
                  ლეპტოპის RAM (GB)
                </p>
              ) : (
                <p className="label">ლეპტოპის RAM (GB)</p>
              )}
              <input
                type="text"
                value={laptopRam}
                className={
                  laptopRamError ? "laptopInfoInput2Error" : "laptopInfoInput2"
                }
                placeholder="0"
                onChange={(e) => setLaptopRam(e.target.value)}
              />
              {laptopRamError ? (
                <p className="label3" style={{ color: "red" }}>
                  მხოლოდ ციფრები
                </p>
              ) : (
                <p className="label3">მხოლოდ ციფრები</p>
              )}
            </div>

            <div onChange={(e) => setLaptopMemoryType(e.target.value)}>
              <p className="label">
                მეხსიერების ტიპი
                {laptopMemoryTypeError && (
                  <i
                    class="fa-solid fa-triangle-exclamation"
                    style={{ color: "#c8cb52" }}
                  ></i>
                )}
              </p>
              <input type="radio" name="memoryType" value="SSD"></input>
              <label className="radioLabel">SSD</label>

              <input
                type="radio"
                className="radioButton"
                name="memoryType"
                value="HDD"
              ></input>
              <label className="radioLabel">HDD</label>
            </div>
          </div>

          <hr className="line" />

          <div class="laptopInfoSecondRow">
            <div>
              <p className="label">შეძენის რიცხვი (არჩევითი)</p>
              <input
                type="date"
                value={laptopDate}
                placeholder="დდ/თთ/წწწწ"
                onChange={(e) => setLaptopDate(e.target.value)}
              />
            </div>
            <div>
              {laptopPriceError ? (
                <p className="label" style={{ color: "red" }}>
                  ლეპტოპის ფასი
                </p>
              ) : (
                <p className="label">ლეპტოპის ფასი</p>
              )}
              <input
                type="text"
                className={
                  laptopPriceError
                    ? "laptopInfoInput2Error"
                    : "laptopInfoInput2"
                }
                placeholder="0"
                value={laptopPrice}
                onChange={(e) => setLaptopPrice(e.target.value)}
              />
              <i
                class="fa-solid fa-lari-sign"
                style={{ marginLeft: "5px" }}
              ></i>
              {laptopPriceError ? (
                <p className="label3" style={{ color: "red" }}>
                  მხოლოდ ციფრები
                </p>
              ) : (
                <p className="label3">მხოლოდ ციფრები</p>
              )}
            </div>

            <div
              style={{ marginRight: "465px" }}
              value={laptopCondition}
              onChange={(e) => setLaptopCondition(e.target.value)}
            >
              <p className="label">ლეპტოპის მდგომარეობა</p>
              {laptopConditionError && (
                <i
                  class="fa-solid fa-triangle-exclamation"
                  style={{ color: "#c8cb52" }}
                ></i>
              )}
              <input type="radio" name="laptopCondition" value="used"></input>
              <label className="radioLabel">მეორადი</label>

              <input
                type="radio"
                className="radioButton"
                name="laptopCondition"
                value="new"
              ></input>
              <label className="radioLabel">ახალი</label>
            </div>
          </div>

          <Link to="/workerinfo">
            <button
              className="button1 backButton1"
              style={{
                float: "left",
                marginLeft: "40px",
                backgroundColor: "white",
                color: "#84bbf3",
                border: "1px solid white",
              }}
            >
              უკან
            </button>
          </Link>

          <button
            className="button1"
            style={{ marginBottom: "40px" }}
            onClick={submitHandler}
          >
            დამახსოვრება
          </button>

          <div>
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <img src={frame} />
              <p className="navTitle1">ჩანაწერი დამატებულია !</p>
              <Link to="/laptoplist">
                <button className="button">სიაში გადაყვანა</button>
              </Link>
              <Link to="/">
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#84bbf3",
                    border: "1px solid white",
                    marginTop: "40px",
                  }}
                  className="button"
                >
                  მთავარი
                </button>
              </Link>
            </Modal>
          </div>
        </div>
        <div>
          <img className="footer" src={footerIMG} style={{ bottom: "0" }} />
        </div>
      </div>
    </div>
  );
};
