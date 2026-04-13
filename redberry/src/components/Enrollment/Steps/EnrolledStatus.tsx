import { useState } from "react";
import { completeCourse } from "../../../api/course.service";
import "./EnrolledStatus.css";

interface EnrolledStatusProps {
  enrollment: any;
  onUpdate: () => void;
}

const EnrolledStatus = ({ enrollment, onUpdate }: EnrolledStatusProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleComplete = async () => {
    setIsUpdating(true);
    try {
      await completeCourse(enrollment.id);
      onUpdate();
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const { schedule, progress } = enrollment;

  return (
    <div className="enrolled-view">
      <div className="enrolled-badge-wrapper">
        <span className="enrolled-badge">Enrolled</span>
      </div>

      <div className="enrolled-details">
        <div className="detail-row">
          <img src="/calendat-icon.png" alt="calendar" />
          <span>{schedule.weeklySchedule.label}</span>
        </div>
        <div className="detail-row">
          <img src="/clock-icon.png" alt="clock" />
          <span>{schedule.timeSlot.label}</span>
        </div>
        <div className="detail-row">
          <img src="/online-icon.png" alt="monitor" />
          <span>
            {schedule.sessionType.name.charAt(0).toUpperCase() +
              schedule.sessionType.name.slice(1)}
          </span>
        </div>
        <div className="detail-row">
          <img src="/location-icon.png" alt="location" />
          <span>{schedule.location || "Tbilisi, Chavchavadze St.30"}</span>
        </div>
      </div>

      <div className="progress-container">
        <p>{progress}% Complete</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {progress < 100 ? (
        <button
          className="complete-course-btn"
          onClick={handleComplete}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Complete Course ✓"}
        </button>
      ) : (
        <div className="completed-status-badge">Completed ✓</div>
      )}
    </div>
  );
};

export default EnrolledStatus;
