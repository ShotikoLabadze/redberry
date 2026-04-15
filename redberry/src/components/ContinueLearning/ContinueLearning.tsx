import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, getMyEnrollments } from "../../api/course.service";
import "./ContinueLearning.css";

interface Props {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onSeeAll: () => void;
}

const ContinueLearning: React.FC<Props> = ({
  isLoggedIn,
  onLoginClick,
  onSeeAll,
}) => {
  const [displayData, setDisplayData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      getMyEnrollments()
        .then((data) => {
          const list = data.data || data;
          setDisplayData(list.slice(0, 3));
        })
        .catch((err) => console.error("Failed to fetch enrollments:", err));
    } else {
      getCourses("")
        .then((data) => {
          const list = data.data || data;

          const formatted = list.slice(0, 3).map((course: any) => ({
            id: `temp-${course.id}`,
            progress: 0,
            course: course,
          }));
          setDisplayData(formatted);
        })
        .catch((err) => console.error("Failed to fetch random courses:", err));
    }
  }, [isLoggedIn]);

  const handleViewCourse = (courseId: number) => {
    if (!isLoggedIn) return;
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

          <button
            className="see-all-link"
            onClick={isLoggedIn ? onSeeAll : onLoginClick}
          >
            See All
          </button>
        </div>
      </header>

      <div
        className="learning-cards-container"
        style={{ position: "relative" }}
      >
        <div className={`cards-grid ${!isLoggedIn ? "is-blurred" : ""}`}>
          {displayData.map((item: any) => (
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
                      <img src="/Star.png" alt="starPhoto" />
                      <span className="rating-val">
                        {item.course?.rating || "4.9"}
                      </span>
                    </div>
                  </div>
                  <h4
                    className="course-title"
                    onClick={() => handleViewCourse(item.course?.id)}
                  >
                    {item.course?.title}
                  </h4>
                </div>
              </div>

              <div className="card-bottom-row">
                <div className="progress-container">
                  <span className="progress-text">
                    {item.progress}% Complete
                  </span>
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
                  disabled={!isLoggedIn}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {!isLoggedIn && (
          <div className="login-overlay">
            <div className="login-overlay-card">
              <div className="lock-icon-container">
                <img src="/Lock.png" alt="lock" />
              </div>
              <p>Sign in to track your learning progress</p>
              <button className="overlay-login-button" onClick={onLoginClick}>
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContinueLearning;
