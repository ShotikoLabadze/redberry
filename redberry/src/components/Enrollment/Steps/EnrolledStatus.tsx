import { useState } from "react";
import {
  addCourseReview,
  completeCourse,
  deleteEnrollment,
} from "../../../api/course.service";
import { useCourse } from "../../../context/CourseContext";
import CourseCompletedModal from "./CourseCompletedModal";
import "./EnrolledStatus.css";

interface EnrolledStatusProps {
  enrollment: any;
  onUpdate: () => void;
}

const EnrolledStatus = ({ enrollment, onUpdate }: EnrolledStatusProps) => {
  const { courseId } = useCourse();

  const [isUpdating, setIsUpdating] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const [showRating, setShowRating] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const { schedule, progress, id } = enrollment;
  const isCompleted = progress === 100;

  const handleComplete = async () => {
    setIsUpdating(true);
    try {
      await completeCourse(id);
      setShowCompletedModal(true);
      setShowRating(true);
      setIsDismissed(false);
    } catch (err: any) {
      console.error("Completion failed", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRate = async (value: number) => {
    if (!courseId) return;
    setRating(value);
    try {
      await addCourseReview(courseId, value);
    } catch (err) {
      console.error("Rating submission failed", err);
    }
  };

  const handleRetake = async () => {
    setIsUpdating(true);
    try {
      await deleteEnrollment(id);
      setShowRating(false);
      setIsDismissed(false);
      setRating(0);
      onUpdate();
    } catch (err: any) {
      console.error("Retake failed", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="enrolled-view-container">
      {showCompletedModal && (
        <CourseCompletedModal
          onClose={() => {
            setShowCompletedModal(false);
            onUpdate();
          }}
        />
      )}

      <div className="enrolled-info-group">
        <div className={`status-badge-figma ${isCompleted ? "completed" : ""}`}>
          <span className="badge-text">
            {isCompleted ? "Completed" : "Enrolled"}
          </span>
        </div>

        <div className="details-stack-figma">
          <div className="detail-row-figma">
            <img src="/calendat-icon.png" alt="calendar" className="icon-24" />
            <span className="detail-text">
              {schedule?.weeklySchedule?.label}
            </span>
          </div>
          <div className="detail-row-figma">
            <img src="/clock-icon.png" alt="clock" className="icon-24" />
            <span className="detail-text">{schedule?.timeSlot?.label}</span>
          </div>
          <div className="detail-row-figma">
            <img src="/online-icon.png" alt="monitor" className="icon-24" />
            <span className="detail-text">
              {schedule?.sessionType?.name
                ? schedule.sessionType.name.charAt(0).toUpperCase() +
                  schedule.sessionType.name.slice(1)
                : ""}
            </span>
          </div>
          <div className="detail-row-figma">
            <img src="/location-icon.png" alt="location" className="icon-24" />
            <span className="detail-text">
              {schedule?.location || "Tbilisi, Chavchavadze St.30"}
            </span>
          </div>
        </div>
      </div>

      <div className="enrolled-actions-group">
        <div className="progress-section-figma">
          <p className="progress-label-figma">{progress}% Complete</p>
          <div className="progress-bar-bg-figma">
            <div
              className="progress-bar-fill-figma"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button
          className="cta-button-figma"
          onClick={isCompleted ? handleRetake : handleComplete}
          disabled={isUpdating}
        >
          <span className="btn-label-text">
            {isUpdating
              ? "Processing..."
              : isCompleted
                ? "Retake Course"
                : "Complete Course"}
          </span>
          <span className="btn-icon">{isCompleted ? "↺" : "✓"}</span>
        </button>
      </div>

      {(showRating || (isCompleted && rating === 0)) && !isDismissed && (
        <div className="rating-card-figma">
          <button
            className="close-rating-btn"
            onClick={() => setIsDismissed(true)}
          >
            <img src="/CloseVector.png" alt="close" />
          </button>
          <p className="rate-title">Rate your experience</p>
          <div className="star-row-figma">
            {[1, 2, 3, 4, 5].map((starValue) => {
              const isFilled = (hoverRating || rating) >= starValue;
              return (
                <img
                  key={starValue}
                  src={isFilled ? "/ActiveStar.png" : "/InactiveStar.png"}
                  alt={`star-${starValue}`}
                  className="star-asset-figma"
                  onClick={() => handleRate(starValue)}
                  onMouseEnter={() => !isUpdating && setHoverRating(starValue)}
                  onMouseLeave={() => !isUpdating && setHoverRating(0)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledStatus;
