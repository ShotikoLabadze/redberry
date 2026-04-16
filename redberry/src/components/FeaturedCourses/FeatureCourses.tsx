import React, { useEffect, useState } from "react";
import { getFeatured } from "../../api/course.service";
import FeaturedCard from "./FeaturedCard/FeaturedCard";
import "./FeaturedCourses.css";

const FeaturedCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcFeatured = async () => {
      try {
        const data = await getFeatured();
        setCourses(data.data);
      } catch (err) {
        console.error("Failed to fetch featured courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetcFeatured();
  }, []);

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <FeaturedCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default FeaturedCourses;
