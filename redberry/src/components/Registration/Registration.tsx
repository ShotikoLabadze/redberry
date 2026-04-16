import type { ChangeEvent, DragEvent } from "react";
import { useRef, useState } from "react";
import { register } from "../../api/auth.service";
import "./Registration.css";

import BackIcon from "../../assets/BackVector.png";
import EyeClosed from "../../assets/closedEye.png";
import EyeOpen from "../../assets/eye.png";
import UploadIcon from "../../assets/uploadIcon.png";

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const processFile = (file: File) => {
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
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
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
          <img src={BackIcon} alt="backarrow" />
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
          <div className={`input ${error ? "error-state" : ""}`}>
            <label>Email*</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <button className="submit-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="step-content">
          <div className={`input ${error ? "error-state" : ""}`}>
            <label>Password*</label>
            <div className="input-wrapper">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
              />
              <img
                src={isVisible ? EyeOpen : EyeClosed}
                alt="toggle"
                className="icon"
                onClick={() => setIsVisible(!isVisible)}
              />
            </div>
          </div>

          <div className={`input ${error ? "error-state" : ""}`}>
            <label>Confirm Password*</label>
            <div className="input-wrapper">
              <input
                type={isConfirmVisible ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
              />
              <img
                src={isConfirmVisible ? EyeOpen : EyeClosed}
                alt="toggle"
                className="icon"
                onClick={() => setIsConfirmVisible(!isConfirmVisible)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
          <button className="submit-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="step-content">
          <div className={`input ${error ? "error-state" : ""}`}>
            <label>Username*</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError("");
              }}
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <label>Upload Avatar</label>
          <div className="upload">
            <div
              className={`drop ${avatar ? "uploaded" : ""}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => !avatar && fileInputRef.current?.click()}
            >
              {avatar && preview ? (
                <div className="uploaded-content">
                  <img
                    src={preview}
                    alt="Avatar Preview"
                    className="avatar-preview-img"
                  />
                  <div className="file-info">
                    <span className="file-name">{avatar.name}</span>
                    <span className="file-size">
                      Size - {formatFileSize(avatar.size)}
                    </span>
                    <span
                      className="change-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Change
                    </span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <img
                    className="upload-icon"
                    src={UploadIcon}
                    alt="uploadicon"
                  />
                  <p>
                    Drag and drop or{" "}
                    <span className="upload-link">Upload File</span>
                  </p>
                  <span>JPG, PNG or WebP</span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
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

      <div className="rg-footer">
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
