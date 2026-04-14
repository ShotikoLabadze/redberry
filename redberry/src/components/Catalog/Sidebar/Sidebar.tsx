import { useEffect, useState } from "react";
import { getCategories, getTopics } from "../../../api/course.service";
import "./Sidebar.css";

const Sidebar = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="loading">loading...</div>;

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="filters-title">Filters</h1>
        <button className="clear-all-btn">
          Clear All Filters
          <img src="/CloseVector.png" alt="clear" className="vector-icon" />
        </button>
      </div>

      <div className="sidebar-content">
        <section className="filter-section">
          <h3 className="section-label">Categories</h3>
          <div className="filter-wrapper">
            {categories.map((cat) => (
              <button key={cat.id} className="filter-chip">
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
            {topics.map((topic) => (
              <button key={topic.id} className="filter-chip no-icon">
                <span className="chip-text">{topic.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="sidebar-footer">
        <div className="footer-line"></div>
        <span className="active-count">0 F</span>
      </div>
    </aside>
  );
};

export default Sidebar;
