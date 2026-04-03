import { useState } from "react";
import { register } from "../../api/auth.service";
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

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);

    try {
      const result = await register(formData);
      console.log("Registration successful:", result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (email.includes("@") && email.length > 3) {
        setStep(2);
      } else {
        alert("Please enter a valid email address.");
      }
    } else if (step === 2) {
      if (password.length >= 3 && password === confirmPassword) {
        setStep(3);
      } else {
        alert("Passwords must match and be at least 3 characters long.");
      }
    }
  };

  const handleBack = () => setStep(step - 1);
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

      {step === 2 && (
        <div className="step-content">
          <div className="input">
            <label>Password*</label>
            <div className="input-wrapper">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={isVisible ? "/eye.png" : "/closedEye.png"}
                alt="toggle"
                className="icon"
                onClick={() => setIsVisible(!isVisible)}
              />
            </div>
          </div>

          <div className="input">
            <label>Confirm Password*</label>
            <div className="input-wrapper">
              <input
                type={isConfirmVisible ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img
                src={isConfirmVisible ? "/eye.png" : "/closedEye.png"}
                alt="toggle"
                className="icon"
                onClick={() => setIsConfirmVisible(!isConfirmVisible)}
              />
            </div>
          </div>
          <button className="submit-btn" onClick={handleNext}>
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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      )}

      <div className="footer">
        <div className="divider">
          <span>or</span>
        </div>
        <p>
          Already have an account?
          <span className="link" onClick={onSwitchToLogin}>
            Log In
          </span>
        </p>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Registration;
