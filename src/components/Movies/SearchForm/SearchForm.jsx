import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";


function SearchForm({ onSubmit, keyword, setKeyword, isShort, setIsShort }) {
  const [missingKeywordErrMessage, setMissingKeywordErrMessage] = useState('');

  function handleSearch(event) {
    event.preventDefault();
    if (keyword) {
      setMissingKeywordErrMessage(false);
      onSubmit();
    } else {
      setMissingKeywordErrMessage(true);
    }
  };

  return (
    <section className="search">
      <div className="search__container">
       <form className="search__form" noValidate onSubmit={handleSearch}>
          <div className="search__wrap">
            <input 
              className="search__input" 
              name="search"
              placeholder="Фильм"
              type="text"
              autoComplete="off"
              value={keyword || ""}
              onChange={(event) => setKeyword(event.target.value)}
              required
            />
            {missingKeywordErrMessage && (
              <span className='search__input-error'>
                Необходимо ввести ключевое слово
              </span>
          )}
            <button type="submit" className="search__submit-button button"></button>
          </div>
          <FilterCheckbox isShort={isShort} setIsShort={setIsShort}>Короткометражки</FilterCheckbox>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;