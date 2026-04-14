import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img
          src={currentPage === 1 ? "/left-disabled.png" : "/left-active.png"}
          alt="Prev"
        />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-number ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img
          src={
            currentPage === totalPages
              ? "/right-disabled.png"
              : "/right-active.png"
          }
          alt="Next"
        />
      </button>
    </div>
  );
};

export default Pagination;
