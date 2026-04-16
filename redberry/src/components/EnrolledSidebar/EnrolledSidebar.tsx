import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "../../assets/Star.png";
import CalendarIcon from "../../assets/calendat-icon.png";
import ClockIcon from "../../assets/clock-icon.png";
import EnrolledStatus from "../Enrollment/Steps/EnrolledStatus";
import "./EnrolledSidebar.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  enrollments: any[];
  onUpdate: () => void;
}

const EnrolledSidebar: React.FC<Props> = ({
  isOpen,
  onClose,
  enrollments,
  onUpdate,
}) => {
  const navigate = useNavigate();

  const handleView = (courseId: number) => {
    navigate(`/course/${courseId}`);
    onClose();
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
                  </div>
                </div>
              </div>

              <div className="es-card-footer">
                <EnrolledStatus enrollment={item} onUpdate={onUpdate} />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default EnrolledSidebar;
