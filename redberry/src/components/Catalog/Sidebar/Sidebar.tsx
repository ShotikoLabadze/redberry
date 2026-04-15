import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getCategories,
  getInstructors,
  getTopics,
} from "../../../api/course.service";
import "./Sidebar.css";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catsRes, topsRes, instRes] = await Promise.all([
          getCategories(),
          getTopics(),
          getInstructors(),
        ]);
        setCategories(catsRes.data);
        setTopics(topsRes.data);
        setInstructors(instRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const toggleFilter = (key: string, id: number) => {
    const newParams = new URLSearchParams(searchParams);
    const currentValues = newParams.getAll(key);
    const idStr = id.toString();

    if (currentValues.includes(idStr)) {
      const filtered = currentValues.filter((v) => v !== idStr);
      newParams.delete(key);
      filtered.forEach((v) => newParams.append(key, v));
    } else {
      newParams.append(key, idStr);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const selectedCats = searchParams.getAll("categories[]").map(Number);
  const selectedTops = searchParams.getAll("topics[]").map(Number);
  const selectedInsts = searchParams.getAll("instructors[]").map(Number);

  const showTopics =
    selectedCats.length > 0
      ? topics.filter((topic) => selectedCats.includes(topic.categoryId))
      : topics;

  if (loading) return <div>Loading...</div>;

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="filters-title">Filters</h1>
        <button className="clear-all-btn" onClick={() => setSearchParams({})}>
          Clear All <img src="/CloseVector.png" alt="clear" />
        </button>
      </div>

      <div className="sidebar-content">
        <section className="filter-section">
          <h3 className="section-label">Categories</h3>
          <div className="filter-wrapper">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-chip ${selectedCats.includes(cat.id) ? "active" : ""}`}
                onClick={() => toggleFilter("categories[]", cat.id)}
              >
                <div className="chip-icon">
                  <img src={`/${cat.icon}.png`} alt="" />
                </div>
                <span className="chip-text">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="filter-section">
          <h3 className="section-label">Topics</h3>
          <div className="filter-wrapper">
            {showTopics.map((topic) => (
              <button
                key={topic.id}
                className={`filter-chip no-icon ${selectedTops.includes(topic.id) ? "active" : ""}`}
                onClick={() => toggleFilter("topics[]", topic.id)}
              >
                <span className="chip-text">{topic.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="filter-section">
          <h3 className="section-label">Instructor</h3>
          <div className="filter-wrapper">
            {instructors.map((inst) => (
              <button
                key={inst.id}
                className={`filter-chip ${selectedInsts.includes(inst.id) ? "active" : ""}`}
                onClick={() => toggleFilter("instructors[]", inst.id)}
              >
                <div className="chip-icon">
                  <img
                    src={inst.avatar}
                    alt=""
                    className="instructor-avatar-img"
                  />
                </div>
                <span className="chip-text">{inst.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
