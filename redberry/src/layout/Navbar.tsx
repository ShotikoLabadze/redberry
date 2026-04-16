import { Link } from "react-router-dom";
import "./Navbar.css";

import BookIcon from "../assets/book.png";
import DefaultAvatar from "../assets/defAvatar.png";
import Logo from "../assets/Logo.png";
import StarsIcon from "../assets/Vector.png";

interface NavbarProps {
  isLoggedIn: boolean;
  user: any;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onProfileClick: () => void;
  onEnrolledClick: () => void;
}

const Navbar = ({
  isLoggedIn,
  user,
  onLoginClick,
  onSignUpClick,
  onProfileClick,
  onEnrolledClick,
}: NavbarProps) => {
  return (
    <nav className="nv-bar">
      <div className="nv-container">
        <div className="nv-left">
          <Link to="/" className="nv-logo-link">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="nv-right">
          <div className="nv-links-group">
            <Link to="/catalog" className="nv-link nv-browse">
              <img src={StarsIcon} alt="Stars" />
              <span>Browse Courses</span>
            </Link>

            {isLoggedIn && (
              <div className="nv-link nv-enrolled" onClick={onEnrolledClick}>
                <img src={BookIcon} alt="Books" />
                <span>Enrolled Courses</span>
              </div>
            )}
          </div>

          {!isLoggedIn ? (
            <div className="nv-auth">
              <button className="nv-btn nv-login" onClick={onLoginClick}>
                Log In
              </button>
              <button className="nv-btn nv-signup" onClick={onSignUpClick}>
                Sign Up
              </button>
            </div>
          ) : (
            <div className="nv-profile" onClick={onProfileClick}>
              <div className="nv-avatar-container">
                <img
                  src={user?.avatar || DefaultAvatar}
                  alt="Profile"
                  className="nv-avatar-img"
                />
                <span
                  className={`nv-status ${user?.profileComplete ? "complete" : "incomplete"}`}
                ></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
