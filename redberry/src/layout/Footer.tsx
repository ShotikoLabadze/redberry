import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Footer.css";

interface FooterProps {
  onProfileClick: () => void;
  onEnrolledClick: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onProfileClick,
  onEnrolledClick,
  isLoggedIn,
  onLoginClick,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="logo-box">
                <IoRocketSharp size={20} color="white" />
              </div>
              <span className="brand-name">Bootcamp</span>
            </div>
            <p className="brand-text">
              Your learning journey starts here!
              <br />
              Browse courses to get started.
            </p>
            <div className="social-links">
              <FaFacebookF size={18} />
              <FaTwitter size={18} />
              <FaInstagram size={18} />
              <FaLinkedinIn size={18} />
              <FaYoutube size={18} />
            </div>
          </div>

          <div className="footer-nav">
            <div className="nav-col">
              <h4>Explore</h4>

              <button
                className="footer-link-btn"
                onClick={isLoggedIn ? onEnrolledClick : onLoginClick}
              >
                Enrolled Courses
              </button>

              <Link to="/catalog" className="footer-link-btn">
                Browse Courses
              </Link>
            </div>

            <div className="nav-col">
              <h4>Account</h4>

              <button
                className="footer-link-btn"
                onClick={isLoggedIn ? onProfileClick : onLoginClick}
              >
                My Profile
              </button>
            </div>

            <div className="nav-col">
              <h4>Contact</h4>
              <div className="contact-item">
                <MdEmail size={18} /> <span>contact@company.com</span>
              </div>
              <div className="contact-item">
                <MdPhone size={18} /> <span>(+995) 555 111 222</span>
              </div>
              <div className="contact-item">
                <MdLocationOn size={18} /> <span>Aghmashenebeli St.115</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="bottom-left">
            Copyright © {currentYear} Redberry International
          </div>
          <div className="bottom-right">
            <span>All Rights Reserved</span>
            <span className="divider">|</span>
            <a href="#">Terms and Conditions</a>
            <span className="divider">|</span>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
