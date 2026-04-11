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
          console.error("Error fetching course:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Course not found</div>;

  const isEnrolled = !!data.enrollment;
  const isProfileComplete = !!user?.mobileNumber;

  return (
    <div>
      <section>
        <h1>{data.title}</h1>
        <img src={data.image} alt={data.title} />
        <p>{data.description}</p>
      </section>

      <aside>
        {!isLoggedIn ? (
          <div>
            <p>Authentication Required</p>
            <button onClick={onLoginClick}>Sign In</button>
          </div>
        ) : (
          <>
            {isEnrolled ? (
              <div>
                <h3>You are enrolled!</h3>
              </div>
            ) : (
              <>
                <div>
                  <h4>Weekly Schedule</h4>
                  <p>Total: ${data.basePrice}</p>
                  <button disabled={!isProfileComplete}>Enroll Now</button>
                </div>

                {!isProfileComplete && (
                  <div>
                    <p>Complete Your Profile</p>
                    <p>You need to fill in details before enrolling.</p>
                    <button onClick={onProfileClick}>Complete</button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </aside>
    </div>
  );
};

export default CourseDetails;
