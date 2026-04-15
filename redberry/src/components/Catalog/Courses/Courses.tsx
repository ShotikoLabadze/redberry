import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCourses } from "../../../api/course.service";
import CourseCard from "./CourseCard/CourseCard";
import "./Courses.css";
import Dropdown from "./DropDown/DropDown";
import Pagination from "./Pagination/Pagination";

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await getCourses(searchParams.toString());
        setCourses(response.data);
        setMeta(response.meta);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [searchParams]);
  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="courses-wrapper">
      <div className="courses-header-main">
        <p className="results-counter">
          Showing {courses.length} out of {meta?.total || 0}
        </p>
        <Dropdown
          currentSort={searchParams.get("sort") || "newest"}
          onSortChange={handleSortChange}
        />
      </div>

      <div className={`courses-grid ${loading ? "fetching" : ""}`}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {meta && meta.lastPage > 1 && (
        <Pagination
          currentPage={Number(searchParams.get("page")) || 1}
          totalPages={meta.lastPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Courses;
