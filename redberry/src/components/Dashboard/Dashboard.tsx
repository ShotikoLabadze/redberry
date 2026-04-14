import React from "react";
import ContinueLearning from "../../ContinueLearning/ContinueLearning";
import FeaturedCourses from "../FeaturedCourses/FeatureCourses";
import "./Dashboard.css";

interface DashboardProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isLoggedIn, onLoginClick }) => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <ContinueLearning isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} />

        <section className="start-learning-today">
          <div className="section-header"></div>
          <FeaturedCourses />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
