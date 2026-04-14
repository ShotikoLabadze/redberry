import { useState } from "react";
import { completeCourse, deleteEnrollment } from "../../../api/course.service";
import CourseCompletedModal from "./CourseCompletedModal";
import "./EnrolledStatus.css";

interface EnrolledStatusProps {
  enrollment: any;
  onUpdate: () => void;
}

const EnrolledStatus = ({ enrollment, onUpdate }: EnrolledStatusProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const { schedule, progress, id } = enrollment;
  const isCompleted = progress === 100;

  const handleComplete = async () => {
    setIsUpdating(true);
    try {
      await completeCourse(id);
      setShowCompletedModal(true);
    } catch (err: any) {
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRetake = async () => {
    if (
      window.confirm(
        "Are you sure you want to retake this course? Current progress will be lost.",
      )
    ) {
      setIsUpdating(true);
      try {
        await deleteEnrollment(id);
        onUpdate();
      } catch (err: any) {
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="enrolled-view">
      {showCompletedModal && (
        <CourseCompletedModal
          onClose={() => {
            setShowCompletedModal(false);
            onUpdate();
          }}
        />
      )}

      <div className="enrolled-badge-wrapper">
        <span className={`enrolled-badge ${isCompleted ? "completed" : ""}`}>
          {isCompleted ? "Completed" : "Enrolled"}
        </span>
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

      <button
        className="main-action-btn"
        onClick={isCompleted ? handleRetake : handleComplete}
        disabled={isUpdating}
      >
        {isUpdating
          ? "Processing..."
          : isCompleted
            ? "Retake Course ↺"
            : "Complete Course ✓"}
      </button>
    </div>
  );
};

export default EnrolledStatus;
