import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetCourseById } from "../../api/course.service";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (id) {
        try {
          const response = await GetCourseById(id);
          setData(response.data);
        } catch (err) {
          console.error("Error fetching course:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourses();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>Course not found</div>;

  return <div>{data.title}</div>;
};

export default CourseDetails;
