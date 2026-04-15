import { useState } from "react";
import "./Dropdown.css";

interface SortDropdownProps {
  currentSort: string;
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Title: A-Z", value: "title_asc" },
];

const Dropdown = ({ currentSort, onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const currentLabel = sortOptions.find(
    (opt) => opt.value === currentSort,
  )?.label;

  return (
    <div className="sort-container">
      <div className="sort-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="sort-label">Sort By:</span>
        <span className="sort-current">{currentLabel}</span>
        <img
          src={isOpen ? "/up.png" : "/down.png"}
          alt="arrow"
          className="sort-arrow"
        />
      </div>

      {isOpen && (
        <div className="sort-dropdown">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className={`sort-option ${currentSort === option.value ? "active" : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
