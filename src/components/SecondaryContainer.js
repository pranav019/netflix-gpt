import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);
  return (
    // why we wrapped it inside two boxes :-
    // the secondary conatiner starts after the video container and we gave that bg color of black
    <div className="bg-black">
      {/*  */}
      {/* // this is the another box inside that secondary container box and we are moving this box above making it "out of the box" */}
      <div className="mt-0 md:-mt-28	lg:-mt-60 relative z-20">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies?.topRatedMovies} />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList title={"Up Coming Movies"} movies={movies?.upComingMovies} />
        <MovieList title={"Horror"} movies={movies?.nowPlayingMovies} />
        <MovieList
          title={"Adventure & Thrill"}
          movies={movies?.popularMovies}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
