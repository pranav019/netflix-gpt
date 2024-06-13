import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies = [] }) => {
  console.log(movies);
  return (
    <div className="pt-5 pl-5">
      <h1 className="text-2xl text-white mb-1">{title}</h1>
      <div className="flex overflow-x-scroll  scrollbar">
        <div className="flex">
          {movies?.map((movie) => (
            <div key={movie.id} className="w-48">
              <MovieCard posterPath={movie?.poster_path} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;