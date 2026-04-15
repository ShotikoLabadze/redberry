import React, { useEffect, useState } from "react";
import { getMyEnrollments } from "../../api/course.service";
import ContinueLearning from "../ContinueLearning/ContinueLearning";
import EnrolledSidebar from "../EnrolledSidebar/EnrolledSidebar";
import FeaturedCourses from "../FeaturedCourses/FeatureCourses";
import "./Dashboard.css";

interface DashboardProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isLoggedIn, onLoginClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      getMyEnrollments()
        .then((data) => setEnrollments(data.data || data))
        .catch(() => {});
    }
  }, [isLoggedIn]);

  return (
    <div className="dashboard-wrapper">
      <EnrolledSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        enrollments={enrollments}
      />

      <div className="dashboard-container">
        <ContinueLearning
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
          onSeeAll={() => setIsSidebarOpen(true)}
        />

        <section className="start-learning-today">
          <div className="section-header">
            <h2 className="section-title">Start Learning Today</h2>
            <p className="section-subtitle">
              Choose from our most popular courses and begin your journey
            </p>
          </div>
          <FeaturedCourses />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
