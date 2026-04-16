import React from "react";
import ContinueLearning from "../ContinueLearning/ContinueLearning";
import FeaturedCourses from "../FeaturedCourses/FeatureCourses";
import Hero from "../Hero/Hero";
import "./Dashboard.css";

interface DashboardProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onSeeAllClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  isLoggedIn,
  onLoginClick,
  onSeeAllClick,
}) => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <Hero />
        {isLoggedIn && (
          <ContinueLearning
            isLoggedIn={isLoggedIn}
            onLoginClick={onLoginClick}
            onSeeAll={onSeeAllClick}
          />
        )}

        <section className="start-learning-today">
          <div className="section-header">
            <h2 className="section-title">Start Learning Today</h2>
            <p className="section-subtitle">
              Choose from our most popular courses and begin your journey
            </p>
          </div>
          <FeaturedCourses />
        </section>

        {!isLoggedIn && (
          <ContinueLearning
            isLoggedIn={isLoggedIn}
            onLoginClick={onLoginClick}
            onSeeAll={onSeeAllClick}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
