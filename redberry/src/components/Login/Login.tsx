import { useState } from "react";
import { login } from "../../api/auth.service";

interface LoginProps {
  onSwitchToSignUp: () => void;
  onSuccess: () => void;
}

const Login = ({ onSwitchToSignUp, onSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await login(email, password);

      if (result.data?.token) {
        localStorage.setItem("token", result.data.token);
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome Back</h1>
        <p>Log in to continue your learning</p>
      </div>

      <div className="step-content">
        <div className="input">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <label>Password</label>
          <div className="input-wrapper">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={isVisible ? "/eye.png" : "/closedEye.png"}
              alt="toggle"
              className="icon"
              style={{ cursor: "pointer" }}
              onClick={() => setIsVisible(!isVisible)}
            />
          </div>
        </div>

        <button
          className="submit-btn"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </div>

      <div className="rg-footer">
        <div className="divider">
          <span>or</span>
        </div>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={onSwitchToSignUp}>
            Sign Up
          </span>
        </p>
      </div>

      {error && (
        <p
          style={{
            color: "#FF4D4D",
            fontSize: "12px",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Login;
