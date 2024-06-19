import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  if (!movieNames) {
    return null;
  }
  return (
    <div className="p-4 m-4 bg-black opacity-85 text-white">
      <div>
        {movieNames?.length > 0 &&
          movieNames.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]} //
            />
          ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
