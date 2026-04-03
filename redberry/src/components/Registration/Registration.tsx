import { useState } from "react";
import "./Registration.css";
interface RegistrationProps {
  onSwitchToLogin: () => void;
}

const Registration = ({ onSwitchToLogin }: RegistrationProps) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleNext = () => {
    if (email.length > 3) {
      setStep(2);
    }
  };

  const handleBack = () => setStep(1);
  return (
    <div className="container">
      {step > 1 && (
        <button className="back-arrow" onClick={handleBack}>
          <img src="/BackVector.png" alt="backarrow" />
        </button>
      )}
      <div className="header">
        <h1>Create Account</h1>
        <p>Join and start learning today!</p>
      </div>

      <div className="steps">
        <div className={`step ${step >= 1 ? "active" : ""}`}></div>
        <div className={`step ${step >= 2 ? "active" : ""}`}></div>
        <div className={`step ${step >= 3 ? "active" : ""}`}></div>
      </div>

      {step === 1 && (
        <div className="step-content">
          <div className="input">
            <label>Email*</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="submit-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step == 2 && (
        <div className="step-content">
          <div className="input">
            <label htmlFor="password">Password*</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img src="/eye.png" alt="toggle view" className="icon" />
            </div>
          </div>
          <div className="input">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img src="/closedEye.png" alt="toggle view" className="icon" />
            </div>
          </div>
          <button
            className="submit-btn"
            onClick={() => {
              setStep(3);
            }}
          >
            Next
          </button>
        </div>
      )}

      {step == 3 && (
        <div className="step-content">
          <div className="input">
            <label>Username*</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <label>Upload Avatar</label>
          <div className="upload">
            <div className="drop">
              <div className="upload-placeholder">
                <img
                  className="upload-icon"
                  src="/uploadIcon.png"
                  alt="uploadicon"
                />
                <p>
                  Drag and drop or{" "}
                  <label htmlFor="file-upload" className="upload-link">
                    Upload File
                  </label>
                </p>
                <span>JPG, PNG or WebP</span>
              </div>
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                accept="image/*"
              />
            </div>
          </div>

          <button
            className="submit-btn"
            onClick={() => console.log("signup clicked")}
          >
            Sign Up
          </button>
        </div>
      )}

      <div className="footer">
        <div className="divider">
          <span>or</span>
        </div>
        <p>
          Already have an account?{" "}
          <span className="link" onClick={onSwitchToLogin}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
