import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__wrap">
            <input
              placeholder="Фильм"
              className="search__input"
              type="text"
            />
          <button type="submit" className="search__submit button"></button>
          </div>
          <span className="search__input-error"></span>
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;