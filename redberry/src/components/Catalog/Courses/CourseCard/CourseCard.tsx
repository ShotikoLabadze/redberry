import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

interface CourseCardProps {
  course: any;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/course/${course.id}`);
  };
  return (
    <div className="course-card">
      <div className="card-main-content">
        <div
          className="course-thumbnail"
          style={{ backgroundImage: `url(${course.image})` }}
        ></div>

        <div className="card-details-wrapper">
          <div className="card-meta-row">
            <div className="meta-info-left">
              <span className="instructor-name">{course.instructor.name}</span>
              <div className="separator-dot"></div>
              <span className="duration">{course.durationWeeks} Weeks</span>
            </div>
            <div className="rating-box">
              <img src="/Star.png" alt="star" className="star-icon" />
              <span className="rating-value">{course.avgRating}</span>
            </div>
          </div>

          <h3 className="course-title">{course.title}</h3>

          <div className="category-chip-wrapper">
            <div className="category-chip">
              <img
                src={`/${course.category.icon}.png`}
                alt="icon"
                className="chip-icon"
              />
              <span className="chip-label">{course.category.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="price-container">
          <span className="price-label">Starting from</span>
          <span className="price-value">${course.basePrice}</span>
        </div>
        <button className="cta-button" onClick={handleDetailsClick}>
          Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
