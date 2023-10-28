import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isShort, setIsShort }) {
  const handleCheckboxChange = (event) =>
    event.target.checked ? setIsShort(true) : setIsShort(false);

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          onChange={handleCheckboxChange}
          defaultChecked={isShort}
        />
        <span className="filter-checkbox__toggle-icon" />
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;