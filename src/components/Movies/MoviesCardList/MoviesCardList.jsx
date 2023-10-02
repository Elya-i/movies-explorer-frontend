import React from "react";
import "./MoviesCardList.css";
import { movies } from "../../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  const cardElements = movies.slice(0,12).map((item) => <li key={item.id}><MoviesCard data={item}/></li>);
  return (
    <ul className="cards">
      {cardElements}
    </ul>
  );
}

export default MoviesCardList;