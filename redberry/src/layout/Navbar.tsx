import "./Navbar.css";

const Navbar = () => {
  const isLoggedIn = false;

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

        {!isLoggedIn ? (
          <div className="auth-buttons">
            <button className="login-btn">Log In</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        ) : (
          <div className="user-profile">
            <span>Profile Icon</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
