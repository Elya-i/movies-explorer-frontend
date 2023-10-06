import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <form className="search">
      <div className="search__wrap">
        <input 
          className="search__input" 
          name="search"
          placeholder="Фильм"
          type="text"
          required
        />
        <button type="submit" className="search__submit-button button"></button>
      </div>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;