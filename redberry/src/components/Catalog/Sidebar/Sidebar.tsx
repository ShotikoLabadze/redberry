import { useEffect, useState } from "react";
import { getCategories, getTopics } from "../../../api/course.service";
import "./Sidebar.css";

const Sidebar = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCats, setSelectedCats] = useState<any[]>([]);
  const [selectedTops, setSelectedTops] = useState<any[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catsRes, topsRes] = await Promise.all([
          getCategories(),
          getTopics(),
        ]);
        setCategories(catsRes.data);
        setTopics(topsRes.data);
      } catch (err) {
        console.error("cant fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleCategory = (id: number) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id],
    );
  };

  const handleTopic = (id: number) => {
    setSelectedTops((prev) =>
      prev.includes(id) ? prev.filter((topId) => topId !== id) : [...prev, id],
    );
  };

  const showTopics =
    selectedCats.length > 0
      ? topics.filter((topic) => selectedCats.includes(topic.categoryId))
      : topics;

  const handleClearAll = () => {
    setSelectedCats([]);
    setSelectedTops([]);
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
                onClick={() => handleCategory(cat.id)}
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
                onClick={() => handleTopic(topic.id)}
              >
                <span className="chip-text">{topic.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="sidebar-footer">
        <div className="footer-line"></div>
        <span className="active-count">
          {selectedCats.length + selectedTops.length} Filters Active
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
