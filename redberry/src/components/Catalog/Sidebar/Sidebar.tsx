import { useEffect, useState } from "react";
import {
  getCategories,
  getInstructors,
  getTopics,
} from "../../../api/course.service";
import "./Sidebar.css";

const Sidebar = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCats, setSelectedCats] = useState<number[]>([]);
  const [selectedTops, setSelectedTops] = useState<number[]>([]);
  const [selectedInsts, setSelectedInsts] = useState<number[]>([]);

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
        console.error("cant fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const toggleFilter = (
    id: number,
    selectedItems: number[],
    setSelectedItems: (items: number[]) => void,
  ) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((itemId) => itemId !== id)
        : [...selectedItems, id],
    );
  };

  const showTopics =
    selectedCats.length > 0
      ? topics.filter((topic) => selectedCats.includes(topic.categoryId))
      : topics;

  const handleClearAll = () => {
    setSelectedCats([]);
    setSelectedTops([]);
    setSelectedInsts([]);
  };

  if (loading) return <div className="loading">loading...</div>;

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="filters-title">Filters</h1>
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear All Filters
          <img src="/CloseVector.png" alt="clear" className="vector-icon" />
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
                onClick={() =>
                  toggleFilter(cat.id, selectedCats, setSelectedCats)
                }
              >
                <div className="chip-icon">
                  <img src={`/${cat.icon}.png`} alt={cat.name} />
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
                onClick={() =>
                  toggleFilter(topic.id, selectedTops, setSelectedTops)
                }
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
                onClick={() =>
                  toggleFilter(inst.id, selectedInsts, setSelectedInsts)
                }
              >
                <div className="chip-icon instructor-avatar-wrapper">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="instructor-avatar-img"
                  />
                </div>
                <span className="chip-text">{inst.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="sidebar-footer">
        <div className="footer-line"></div>
        <span className="active-count">
          {selectedCats.length + selectedTops.length + selectedInsts.length}{" "}
          Filters Active
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
