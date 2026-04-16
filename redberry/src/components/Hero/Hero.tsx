import React, { useEffect, useState } from "react";
import "./Hero.css";

import hero1 from "../../assets/hero1.png";
import hero2 from "../../assets/hero2.png";
import hero3 from "../../assets/hero3.png";

import ArrowLeft from "../../assets/Arrowleft.png";
import ArrowLeftDisabled from "../../assets/ArrowleftDisabled.png";
import ArrowRight from "../../assets/Arrowright.png";
import ArrowRightDisabled from "../../assets/ArrowrightDisabled.png";

import step1 from "../../assets/1step.png";
import step2 from "../../assets/2step.png";
import step3 from "../../assets/3step.png";

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Start learning something new today.",
      description:
        "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
      buttonText: "Browse Courses",
      image: hero1,
    },
    {
      title: "Pick up where you left off",
      description:
        "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
      buttonText: "Start Learning",
      image: hero2,
    },
    {
      title: "Learn together, grow faster",
      description:
        "Connect with peers and mentors to enhance your learning experience. Learn together and grow faster with our community.",
      buttonText: "Learn More",
      image: hero3,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(slides.length - 1);
    }
  };

  const getIndicatorImage = () => {
    switch (currentIndex) {
      case 0:
        return step1;
      case 1:
        return step2;
      case 2:
        return step3;
      default:
        return step1;
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentSlide.image})`,
      }}
    >
      <div className="hero-content-wrapper">
        <div className="hero-content">
          <div className="hero-text-stack">
            <h1 className="hero-title">{currentSlide.title}</h1>
            <p className="hero-body">{currentSlide.description}</p>
          </div>
          <button className="hero-cta-button">{currentSlide.buttonText}</button>
        </div>

        <div className="hero-footer">
          <div className="hero-indicator">
            <img src={getIndicatorImage()} alt="steps" />
          </div>

          <div className="hero-arrows-container">
            <img
              src={currentIndex === 0 ? ArrowLeftDisabled : ArrowLeft}
              className="nav-arrow"
              onClick={prevSlide}
              alt="prev"
            />
            <img
              src={
                currentIndex === slides.length - 1
                  ? ArrowRightDisabled
                  : ArrowRight
              }
              className="nav-arrow"
              onClick={nextSlide}
              alt="next"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
