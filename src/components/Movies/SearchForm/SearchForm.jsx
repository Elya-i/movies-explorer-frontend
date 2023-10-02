// import React from "react";
// import "./SearchForm.css";

// function SearchForm() {
//   return (
//     <form className="search">
//       <div className="search__container search__container_type_query">
//         <input className="search__text" required/>
//         <button type="submit" className="search__button"></button>
//       </div>
//       <div className="search__container search__container_type_filter">
//         <label>
//           <input type="checkbox" className="search__filter"/>
//           <span className="search__visible-filter"/>
//         </label>
//         <label className="search__label">Короткометражки</label>
//       </div>
//     </form>
//   );
// }

// export default SearchForm;

import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

function SearchForm({
}) {
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