import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedCard.css";

import StarIcon from "../../../assets/Star.png";

interface CourseProps {
  course: {
    id: number;
    title: string;
    description: string;
    image: string;
    basePrice: string;
    avgRating: number;
    instructor: {
      name: string;
    };
  };
}

const FeaturedCard: React.FC<CourseProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="featured-card">
      <div className="card-image-container">
        <img src={course.image} alt={course.title} className="card-image" />
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="lecturer-name">
            Lecturer {course.instructor.name}
          </span>
          <div className="rating">
            <span>
              <img src={StarIcon} alt="star" />
            </span>{" "}
            <span>{course.avgRating}</span>
          </div>
        </div>

        <h3 className="card-title">{course.title}</h3>

        <p className="card-description">{course.description}</p>

        <div className="card-footer">
          <div className="price-container">
            <p className="price-label">Starting from</p>
            <p className="price-value">
              ${Math.round(parseFloat(course.basePrice))}
            </p>
          </div>

          <button className="details-button" onClick={handleDetails}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
