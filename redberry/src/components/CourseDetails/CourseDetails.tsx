import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetCourseById } from "../../api/course.service";
import "./CourseDetails.css";

interface CourseDetailsProps {
  isLoggedIn: boolean;
  user: any;
  onLoginClick: () => void;
  onProfileClick: () => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  isLoggedIn,
  user,
  onLoginClick,
  onProfileClick,
}) => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        try {
          const response = await GetCourseById(id);
          setData(response.data || response);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!data) return <div className="error">Course not found</div>;

  const isEnrolled = !!data.enrollment;
  const isProfileComplete = !!user?.mobileNumber;

  const avgRating = data.reviews?.length
    ? (
        data.reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) /
        data.reviews.length
      ).toFixed(1)
    : "0.0";

  return (
    <div className="course-page">
      <div className="course-wrapper">
        <main className="course-left">
          <nav className="breadcrumb">
            Home / Browse /{" "}
            <span className="active-link">{data.category.name}</span>
          </nav>

          <h1 className="course-title">{data.title}</h1>

          <div className="course-hero-image">
            <img src={data.image} alt={data.title} />
          </div>

          <div className="course-quick-info">
            <div className="info-badge">{data.durationWeeks} Weeks</div>
            <div className="info-badge">{data.hours} Hours</div>
            <div className="info-badge">Rating: {avgRating}</div>
            <div className="info-badge">{data.category.name}</div>
          </div>

          <div className="course-author">
            <img src={data.instructor.avatar} alt={data.instructor.name} />
            <span className="author-name">{data.instructor.name}</span>
          </div>

          <section className="course-desc">
            <h3>Course Description</h3>
            <p>{data.description}</p>
          </section>
        </main>

        <aside className="course-right">
          <div
            className={`sidebar-card ${(!isLoggedIn || !isProfileComplete) && !isEnrolled ? "locked" : ""}`}
          >
            <div className="step-item">
              <div className="step-header">
                <span className="step-circle">1</span>
                <h4>Weekly Schedule</h4>
              </div>
              <div className="options-grid">
                <button className="opt-btn active">Mon - Wed</button>
                <button className="opt-btn disabled">Tue - Thu</button>
                <button className="opt-btn">Wed - Fri</button>
                <button className="opt-btn disabled">Weekend</button>
              </div>
            </div>

            <div className="price-footer">
              <div className="price-main">
                <span>Total Price</span>
                <span className="price-val">${Math.round(data.basePrice)}</span>
              </div>
              <div className="price-sub">
                <span>Base Price: +$0</span>
              </div>
              <div className="price-sub">
                <span>Session Type: +$0</span>
              </div>
              <button
                className="enroll-btn"
                disabled={!isLoggedIn || !isProfileComplete || isEnrolled}
              >
                {isEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>
            </div>
          </div>

          {!isLoggedIn ? (
            <div className="alert-card">
              <div className="alert-text">
                <h5>! Authentication Required</h5>
                <p>
                  You need sign in to your profile before enrolling in this
                  course.
                </p>
              </div>
              <button className="alert-btn" onClick={onLoginClick}>
                Sign In →
              </button>
            </div>
          ) : !isProfileComplete ? (
            <div className="alert-card">
              <div className="alert-text">
                <h5>! Complete Your Profile</h5>
                <p>
                  You need to fill in your profile details before enrolling in
                  this course.
                </p>
              </div>
              <button className="alert-btn" onClick={onProfileClick}>
                Complete →
              </button>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
