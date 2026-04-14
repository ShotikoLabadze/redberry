import { useEffect, useState } from "react";
import { getCourses } from "../../../api/course.service";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await getCourses(sort, page);
        setCourses(response.data);
        setMeta(response.meta);
      } catch (err) {
        console.error("error fetching courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [sort, page]);

  if (loading) return <div>loading...</div>;

  return (
    <div>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id}>
            <img
              src={course.image}
              alt={course.title}
              style={{ width: "100px" }}
            />
            <p>{course.title}</p>
            <span>${course.basePrice}</span>
          </div>
        ))
      ) : (
        <div>No courses found</div>
      )}
    </div>
  );
};

export default Courses;
