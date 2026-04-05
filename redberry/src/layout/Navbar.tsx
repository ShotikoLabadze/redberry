import "./Navbar.css";

interface NavbarProps {
  isLoggedIn: boolean;
  user: any;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onProfileClick: () => void;
}

const Navbar = ({
  isLoggedIn,
  user,
  onLoginClick,
  onSignUpClick,
  onProfileClick,
}: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/Logo.png" alt="Redberry Logo" />
      </div>

      <div className="nav-right">
        <a href="/" className="browse-link">
          <img src="/Vector.png" alt="Stars" />
          <span> Browse Courses</span>
        </a>

        {isLoggedIn && (
          <a href="/enrolled" className="enrolled-link">
            <img src="/book-icon.png" alt="Books" />
            <span> Enrolled Courses</span>
          </a>
        )}

        {!isLoggedIn ? (
          <div className="auth-buttons">
            <button className="login-btn" onClick={onLoginClick}>
              Log In
            </button>
            <button className="signup-btn" onClick={onSignUpClick}>
              Sign Up
            </button>
          </div>
        ) : (
          <div className="user-profile-trigger" onClick={onProfileClick}>
            <div className="avatar-wrapper">
              <img
                src={user?.avatar || "/defAvatar.png"}
                alt="Profile"
                className="nav-avatar"
              />

              <span
                className={`status-indicator ${user?.profileComplete ? "complete" : "incomplete"}`}
              ></span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
