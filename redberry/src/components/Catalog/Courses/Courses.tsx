import { useEffect, useState } from "react";
import { getCourses } from "../../../api/course.service";
import CourseCard from "./CourseCard/CourseCard";
import "./Courses.css";
import Dropdown from "./DropDown/DropDown";
import Pagination from "./Pagination/Pagination";

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

  return (
    <div className="courses-wrapper">
      <div className="courses-header-main">
        <p className="results-counter">
          Showing {courses.length} out of {meta?.total || 0}
        </p>

        <Dropdown currentSort={sort} onSortChange={(value) => setSort(value)} />
      </div>

      <div className={`courses-grid ${loading ? "fetching" : ""}`}>
        {courses.map((courseItem) => (
          <CourseCard key={courseItem.id} course={courseItem} />
        ))}
      </div>

      {meta && meta.lastPage > 1 && (
        <Pagination
          currentPage={page}
          totalPages={meta.lastPage}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
};

export default Courses;
