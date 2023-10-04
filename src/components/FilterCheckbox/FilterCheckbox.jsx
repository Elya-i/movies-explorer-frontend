import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(filterText) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          type="checkbox"
          className="filter-checkbox__input"
        />
        <span className="filter-checkbox__toggle-icon" />
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;