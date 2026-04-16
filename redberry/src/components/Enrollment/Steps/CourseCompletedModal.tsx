import React, { useState } from "react";
import { addCourseReview } from "../../../api/course.service";
import { useCourse } from "../../../context/CourseContext";
import "./CourseCompletedModal.css";

interface Props {
  onClose: () => void;
}

const CourseCompletedModal: React.FC<Props> = ({ onClose }) => {
  const { courseId, courseTitle } = useCourse();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRate = async (value: number) => {
    if (!courseId || isSubmitting) return;

    setRating(value);
    setIsSubmitting(true);

    try {
      await addCourseReview(courseId, value);
      onClose();
    } catch (error: any) {
      if (error.response?.status === 409) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="completed-modal-overlay">
      <div className="completed-modal-content">
        <div className="confetti-icon-wrapper">
          <img
            src="/complete-course.png"
            alt="Congratulations"
            className="modal-main-icon"
          />
        </div>

        <div className="modal-text-container">
          <h2>Congratulations!</h2>
          <p>You've completed “{courseTitle}” Course!</p>
        </div>

        <div className="rate-experience-section">
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={
                  (hoverRating || rating) >= star
                    ? "/ActiveStar.png"
                    : "/InactiveStar.png"
                }
                alt={`Star ${star}`}
                className="star-img"
                onClick={() => handleRate(star)}
                onMouseEnter={() => !isSubmitting && setHoverRating(star)}
                onMouseLeave={() => !isSubmitting && setHoverRating(0)}
              />
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="done-btn"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCompletedModal;
