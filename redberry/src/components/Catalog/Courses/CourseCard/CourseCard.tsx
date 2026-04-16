import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

import Star from "../../../../assets/Star.png";

interface CourseCardProps {
  course: any;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/course/${course.id}`);
  };

  const getCategoryIcon = (iconName: string) => {
    return new URL(`../../../../assets/${iconName}.png`, import.meta.url).href;
  };

  return (
    <div className="cc-card">
      <div className="cc-main">
        <div
          className="cc-thumb"
          style={{ backgroundImage: `url(${course.image})` }}
        ></div>

        <div className="cc-details">
          <div className="cc-meta">
            <div className="cc-meta-left">
              <span className="cc-instructor">{course.instructor.name}</span>
              <div className="cc-dot"></div>
              <span className="cc-weeks">{course.durationWeeks} Weeks</span>
            </div>
            <div className="cc-rating">
              <img src={Star} alt="star" className="cc-star-icon" />
              <span className="cc-rating-val">{course.avgRating}</span>
            </div>
          </div>

          <h3 className="cc-title">{course.title}</h3>

          <div className="cc-chip-wrapper">
            <div className="cc-chip">
              <img
                src={getCategoryIcon(course.category.icon)}
                alt="icon"
                className="cc-chip-icon"
              />
              <span className="cc-chip-label">{course.category.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cc-footer">
        <div className="cc-price">
          <span className="cc-price-label">Starting from</span>
          <span className="cc-price-val">${course.basePrice}</span>
        </div>
        <button className="cc-btn" onClick={handleDetailsClick}>
          Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
