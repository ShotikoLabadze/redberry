import { useState } from "react";
import "./Registration.css";
interface RegistrationProps {
  onSwitchToLogin: () => void;
}

const Registration = ({ onSwitchToLogin }: RegistrationProps) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (email.length > 3) {
      setStep(2);
    }
  };
  return (
    <div className="container">
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
