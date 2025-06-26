// imports
import { useState, useEffect } from "react";
import "../css/FilterDialog.css";

function FilterDialog({ isOpen, onClose, initialFilters, onApplyFilters }) {
  const [speed, setSpeed] = useState(initialFilters.speed);
  const [glide, setGlide] = useState(initialFilters.glide);
  const [turn, setTurn] = useState(initialFilters.turn);
  const [fade, setFade] = useState(initialFilters.fade);

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  const handleGlideChange = (e) => {
    setGlide(Number(e.target.value));
  };

  const handleTurnChange = (e) => {
    setTurn(Number(e.target.value));
  };

  const handleFadeChange = (e) => {
    setFade(Number(e.target.value));
  };

  // useEffect to update local dialog state when initialFilters prop changes
  // this ensures the dialog reflects the currently applied filters when reopened
  useEffect(() => {
    setSpeed(initialFilters.speed);
    setGlide(initialFilters.glide);
    setTurn(initialFilters.turn);
    setFade(initialFilters.fade);
  }, [initialFilters]);

  // function to handle applying filter
  const handleApplyClick = () => {
    onApplyFilters({ speed, glide, turn, fade });
    onClose();
  };

  // function to handle clearing filters
  const handleClearClick = () => {
    const clearedFilters = {speed: 8, glide: 4, turn: -2, fade: 2};
    setSpeed(clearedFilters.speed);
    setGlide(clearedFilters.glide);
    setTurn(clearedFilters.turn);
    setFade(clearedFilters.fade)

    onApplyFilters(clearedFilters, true)
    onClose()
  }

  if (!isOpen) return null;

  return (
    <div className="filter-dialog-overlay" onClick={onClose}>
      {" "}
      {/* Click overlay to close */}
      <div
        className="filter-dialog-content"
        onClick={(e) => e.stopPropagation()}
      >
        {" "}
        {/* Prevent clicks inside dialog from closing it */}
        <h2>Filter Discs by Flight</h2>
        {/* speed filter */}
        <div className="filter-group">
          <label htmlFor="speed">
            Speed: <span className="fliter-value">{speed}</span>
          </label>
          <input
            type="range"
            id="speed"
            min="1"
            max="15"
            value={speed}
            onChange={handleSpeedChange}
            className="filter-slider"
          />
        </div>
        {/* glide filter */}
        <div className="filter-group">
          <label htmlFor="glide">
            Glide: <span className="fliter-value">{glide}</span>
          </label>
          <input
            type="range"
            id="glide"
            min="1"
            max="7"
            value={glide}
            onChange={handleGlideChange}
            className="filter-slider"
          />
        </div>
        {/* turn filter */}
        <div className="filter-group">
          <label htmlFor="turn">
            Turn: <span className="fliter-value">{turn}</span>
          </label>
          <input
            type="range"
            id="turn"
            min="-5"
            max="1"
            value={turn}
            onChange={handleTurnChange}
            className="filter-slider"
          />
        </div>
        {/* fade filter */}
        <div className="filter-group">
          <label htmlFor="fade">
            Fade: <span className="fliter-value">{fade}</span>
          </label>
          <input
            type="range"
            id="fade"
            min="0"
            max="5"
            value={fade}
            onChange={handleFadeChange}
            className="filter-slider"
          />
        </div>
        <div className="filter-actions">
          <button onClick={handleClearClick} className="action-button clear-button">Clear Filters</button>
          <button
            onClick={handleApplyClick}
            className="action-button apply-button"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterDialog;
