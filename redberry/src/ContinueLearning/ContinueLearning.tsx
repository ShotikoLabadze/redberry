import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEnrollments } from "../api/course.service";
import "./ContinueLearning.css";

interface Props {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const ContinueLearning: React.FC<Props> = ({ isLoggedIn, onLoginClick }) => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      getMyEnrollments()
        .then((data) => setEnrollments(data.data || data))
        .catch((err) => console.error("Failed to fetch enrollments:", err));
    }
  }, [isLoggedIn]);

  const handleViewCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section className="continue-learning-section">
      <header className="learning-header">
        <div className="header-content">
          <div className="title-stack">
            <h2 className="main-title">Continue Learning</h2>
            <p className="sub-title">Pick up where you left off</p>
          </div>
          <button className="see-all-link">See All</button>
        </div>
      </header>

      <div className={`cards-grid ${!isLoggedIn ? "is-blurred" : ""}`}>
        {enrollments.slice(0, 3).map((item) => (
          <div key={item.id} className="figma-course-card">
            <div className="card-top-row">
              <div
                className="course-thumb"
                style={{ backgroundImage: `url(${item.course?.image})` }}
                onClick={() => handleViewCourse(item.course?.id)}
              />

              <div className="course-text-stack">
                <div className="lecturer-rating-line">
                  <span className="lecturer-name">
                    Lecturer {item.course?.instructor?.name}
                  </span>
                  <div className="rating-pill">
                    <span className="star-icon">★</span>
                    <span className="rating-val">
                      {item.course?.rating || "4.9"}
                    </span>
                  </div>
                </div>
                <h4
                  className="course-title"
                  onClick={() => handleViewCourse(item.course?.id)}
                  style={{ cursor: "pointer" }}
                >
                  {item.course?.title}
                </h4>
              </div>
            </div>

            <div className="card-bottom-row">
              <div className="progress-container">
                <span className="progress-text">{item.progress}% Complete</span>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              <button
                className="view-btn"
                onClick={() => handleViewCourse(item.course?.id)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContinueLearning;
