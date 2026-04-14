import React from "react";
import "./Catalog.css";
import Courses from "./Courses/Courses";
import Sidebar from "./Sidebar/Sidebar";

const Catalog: React.FC = () => {
  return (
    <div className="catalog-page">
      <div className="catalog-container">
        <nav className="catalog-breadcrumb">
          Home <span>/</span> <span className="active-path">Browse</span>
        </nav>

        <div className="catalog-layout">
          <Sidebar />

          <main className="catalog-main-content">
            <Courses />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
