import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetCourseById } from "../../api/course.service";
import { useCourse } from "../../context/CourseContext";
import Enrollment from "../Enrollment/Enrollment";
import EnrolledStatus from "../Enrollment/Steps/EnrolledStatus";
import "./CourseDetails.css";

import CalendarIcon from "../../assets/calendat-icon.png";
import ClockIcon from "../../assets/clock-icon.png";
import StarIcon from "../../assets/Star.png";

const CourseDetails: React.FC<any> = ({
  isLoggedIn,
  user,
  onLoginClick,
  onProfileClick,
}) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setCourseData } = useCourse();

  const fetchCourse = async () => {
    if (id) {
      try {
        setLoading(true);
        const response = await GetCourseById(id);
        const courseData = response.data || response;
        setData(courseData);
        setCourseData(courseData.id, courseData.title);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const getCategoryIcon = (categoryName: string) => {
    const fileName = categoryName.toLowerCase().replace(/\s+/g, "-");

    return new URL(`../../assets/${fileName}.png`, import.meta.url).href;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!data) return <div className="error">Course not found</div>;

  const isEnrolled = !!data.enrollment;
  const isProfileComplete = !!user?.mobileNumber;
  const avgRating = data.reviews?.length
    ? (
        data.reviews.reduce((acc: any, rev: any) => acc + rev.rating, 0) /
        data.reviews.length
      ).toFixed(1)
    : "4.9";

  return (
    <div className="course-details-page">
      <div className="course-main-wrapper">
        <main className="left-content">
          <div className="title-section-container">
            <nav className="breadcrumb-figma">
              <span className="crumb">Home</span>
              <span className="arrow"></span>
              <span className="crumb">Browse</span>
              <span className="arrow"></span>
              <span className="crumb active">{data.category.name}</span>
            </nav>
            <h1 className="course-main-title">{data.title}</h1>
          </div>

          <div className="hero-and-meta-container">
            <div className="hero-image-frame">
              <img src={data.image} alt={data.title} />
            </div>

            <div className="meta-info-bar">
              <div className="meta-left-group">
                <div className="meta-item">
                  <img src={CalendarIcon} alt="Duration" />
                  <span>{data.durationWeeks} Weeks</span>
                </div>
                <div className="meta-item">
                  <img src={ClockIcon} alt="Hours" />
                  <span>{data.hours} Hours</span>
                </div>
              </div>

              <div className="meta-right-group">
                <div className="meta-item rating-item">
                  <img src={StarIcon} alt="Rating" />
                  <span>{avgRating}</span>
                </div>
                <div className="category-chip">
                  <img
                    src={getCategoryIcon(data.category.name)}
                    alt={data.category.name}
                    className="category-icon-small"
                  />
                  <span>{data.category.name}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="description-section-container">
            <div className="instructor-card-figma">
              <img src={data.instructor.avatar} alt={data.instructor.name} />
              <span>{data.instructor.name}</span>
            </div>

            <div className="description-text-frame">
              <h4 className="desc-header">Course Description</h4>
              <p className="desc-body">{data.description}</p>
            </div>
          </div>
        </main>

        <aside className="right-sidebar">
          <div
            className={`sticky-sidebar-card ${
              (!isLoggedIn || !isProfileComplete) && !isEnrolled ? "locked" : ""
            }`}
          >
            {isEnrolled ? (
              <EnrolledStatus
                enrollment={data.enrollment}
                onUpdate={fetchCourse}
              />
            ) : (
              <Enrollment
                courseId={data.id}
                basePrice={data.basePrice}
                courseTitle={data.title}
              />
            )}
          </div>

          {!isLoggedIn && (
            <div className="profile-alert-container">
              <div className="alert-content">
                <div className="alert-header">
                  <span className="warning-icon">⚠️</span>
                  <span className="alert-title">Authentication Required</span>
                </div>
                <p className="alert-sub">
                  You need sign in before enrolling in this course.
                </p>
              </div>
              <button className="alert-cta" onClick={onLoginClick}>
                Sign In →
              </button>
            </div>
          )}

          {isLoggedIn && !isProfileComplete && !isEnrolled && (
            <div className="profile-alert-container">
              <div className="alert-content">
                <div className="alert-header">
                  <span className="warning-icon">⚠️</span>
                  <span className="alert-title">Complete Your Profile</span>
                </div>
                <p className="alert-sub">
                  Fill in your profile details before enrolling.
                </p>
              </div>
              <button className="alert-cta" onClick={onProfileClick}>
                Complete →
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
