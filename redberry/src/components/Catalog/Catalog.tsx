import React from "react";
import "./Catalog.css";
import Courses from "./Courses/Courses";
import Sidebar from "./Sidebar/Sidebar";

const Catalog: React.FC = () => {
  return (
    <div>
      <div>
        <nav>Home</nav>

        <div>
          <Sidebar />

          <main>
            <Courses />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
