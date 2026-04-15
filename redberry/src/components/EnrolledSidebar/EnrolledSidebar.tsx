import React from "react";
import { useNavigate } from "react-router-dom";
import "./EnrolledSidebar.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  enrollments: any[];
}

const EnrolledSidebar: React.FC<Props> = ({ isOpen, onClose, enrollments }) => {
  const navigate = useNavigate();

  const handleView = (courseId: number) => {
    navigate(`/course/${courseId}`);
    onClose();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

      <aside className={`enrolled-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header-wrapper">
          <div className="header-top">
            <h2>Enrolled Courses</h2>
            <span className="total-enrollments">
              Total Enrollments {enrollments.length}
            </span>
          </div>
          <button className="close-x" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="sidebar-scroll-content">
          {enrollments.map((item) => (
            <div key={item.id} className="enrolled-side-card">
              <div className="card-main-info">
                <div
                  className="side-card-img"
                  style={{ backgroundImage: `url(${item.course?.image})` }}
                />

                <div className="side-card-text">
                  <div className="side-lecturer-line">
                    <span className="side-lecturer">
                      Instructor: {item.course?.instructor?.name}
                    </span>
                    <div className="side-rating">
                      <img src="/Star.png" alt="starPhoto" />
                      <span>{item.course?.rating || "4.9"}</span>
                    </div>
                  </div>
                  <h3 className="side-course-title">{item.course?.title}</h3>

                  <div className="side-schedule-info">
                    <div className="schedule-row">
                      <img src="/calendat-icon.png" alt="calendar" />
                      <span>
                        {item.schedule?.weeklySchedule?.label ||
                          "განრიგი არაა მითითებული"}
                      </span>
                    </div>

                    <div className="schedule-row">
                      <img src="/clock-icon.png" alt="clock" />
                      <span>
                        {item.schedule?.timeSlot?.label ||
                          "დრო არაა მითითებული"}
                      </span>
                    </div>

                    <div className="schedule-row">
                      <img src="/online-icon.png" alt="online" />
                      <span>
                        {item.schedule?.sessionType?.name
                          ? item.schedule.sessionType.name
                              .charAt(0)
                              .toUpperCase() +
                            item.schedule.sessionType.name.slice(1)
                          : "ტიპი არაა მითითებული"}
                      </span>
                    </div>

                    <div className="schedule-row">
                      <img src="/location-icon.png" alt="location" />
                      <span>
                        {item.schedule?.location ||
                          "Tbilisi, Chavchavadze St.30"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="side-card-footer">
                <div className="side-progress-block">
                  <span className="side-progress-label">
                    {item.progress}% Complete
                  </span>
                  <div className="side-progress-track">
                    <div
                      className="side-progress-fill"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                <button
                  className="side-view-btn"
                  onClick={() => handleView(item.course?.id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default EnrolledSidebar;
