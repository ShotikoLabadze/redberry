import React from "react";
import { useNavigate } from "react-router-dom";
import "./EnrolledSidebar.css";

import StarIcon from "../../assets/Star.png";
import CalendarIcon from "../../assets/calendat-icon.png";
import ClockIcon from "../../assets/clock-icon.png";
import LocationIcon from "../../assets/location-icon.png";

import HybridIcon from "../../assets/hybrid-icon.png";
import InPersonIcon from "../../assets/in-person-icon.png";
import OnlineIcon from "../../assets/online-icon.png";

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

  const getSessionIcon = (sessionName: string) => {
    if (!sessionName) return OnlineIcon;
    const name = sessionName.toLowerCase();

    if (name.includes("online")) return OnlineIcon;
    if (name.includes("hybrid")) return HybridIcon;
    if (name.includes("person") || name.includes("in-person"))
      return InPersonIcon;

    return OnlineIcon;
  };

  return (
    <>
      <div
        className={`es-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

      <aside className={`es-sidebar ${isOpen ? "open" : ""}`}>
        <div className="es-header">
          <div className="es-header-txt">
            <h2>Enrolled Courses</h2>
            <span className="es-total">
              Total Enrollments {enrollments.length}
            </span>
          </div>
          <button className="es-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="es-content">
          {enrollments.map((item) => (
            <div key={item.id} className="es-card">
              <div className="es-card-main">
                <div
                  className="es-card-img"
                  style={{ backgroundImage: `url(${item.course?.image})` }}
                />

                <div className="es-card-info">
                  <div className="es-card-meta">
                    <span className="es-instructor">
                      Instructor: {item.course?.instructor?.name}
                    </span>
                    <div className="es-rating">
                      <img src={StarIcon} alt="star" />
                      <span>{item.course?.rating || "4.9"}</span>
                    </div>
                  </div>
                  <h3 className="es-course-title">{item.course?.title}</h3>

                  <div className="es-schedule">
                    <div className="es-row">
                      <img src={CalendarIcon} alt="cal" />
                      <span>
                        {item.schedule?.weeklySchedule?.label || "TBA"}
                      </span>
                    </div>

                    <div className="es-row">
                      <img src={ClockIcon} alt="clock" />
                      <span>{item.schedule?.timeSlot?.label || "TBA"}</span>
                    </div>

                    <div className="es-row">
                      <img
                        src={getSessionIcon(item.schedule?.sessionType?.name)}
                        alt="session-type"
                      />
                      <span className="es-session-name">
                        {item.schedule?.sessionType?.name || "TBA"}
                      </span>
                    </div>

                    <div className="es-row">
                      <img src={LocationIcon} alt="loc" />
                      <span>
                        {item.schedule?.location || "Tbilisi, Chavchavadze"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="es-card-footer">
                <div className="es-progress-box">
                  <span className="es-progress-txt">
                    {item.progress}% Complete
                  </span>
                  <div className="es-track">
                    <div
                      className="es-fill"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                <button
                  className="es-view-btn"
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
