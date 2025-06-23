// imports
import { useState, useEffect } from "react";
import "../css/FilterDialog.css";

function FilterDialog({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="filter-dialog-overlay" onClick={onClose}>
      <div className="filter-dialog-content" onClick={(e) => e.stopPropagation()}>{" "}{/* Prevent clicks inside dialog from closing it */}
        <h2>Filter Discs by Flight</h2>
      </div>
    </div>
  );
}

export default FilterDialog;
