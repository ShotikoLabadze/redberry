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
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
