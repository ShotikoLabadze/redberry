import type { ChangeEvent } from "react";
import { useState } from "react";
import { register } from "../../api/auth.service";
import "./Registration.css";

interface RegistrationProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

const Registration = ({ onSwitchToLogin, onSuccess }: RegistrationProps) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid image (JPG, PNG, or WebP).");
        return;
      }

      setAvatar(file);
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const result = await register(formData);

      if (result.data?.token) {
        localStorage.setItem("token", result.data.token);
      }

      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email) && email.length >= 3) {
        setStep(2);
        setError("");
      } else {
        setError("Please enter a valid email address.");
      }
    } else if (step === 2) {
      if (password.length >= 3 && password === confirmPassword) {
        setStep(3);
        setError("");
      } else {
        setError("Passwords must match and be at least 3 characters.");
      }
    }
  };

  return (
    <div className="container">
      {step > 1 && (
        <button className="back-arrow" onClick={() => setStep(step - 1)}>
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

      {error && (
        <p className="error-message" style={{ color: "red", fontSize: "12px" }}>
          {error}
        </p>
      )}

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

      {step === 3 && (
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
              {preview ? (
                <div className="preview-container">
                  <img
                    src={preview}
                    alt="Avatar Preview"
                    className="avatar-preview-img"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <button
                    onClick={() => {
                      setPreview(null);
                      setAvatar(null);
                    }}
                    className="remove-avatar"
                  >
                    Remove
                  </button>
                </div>
              ) : (
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
              )}
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isLoading || username.length < 3}
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
    </div>
  );
};

export default Registration;
