import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  //use selector
  // debugger;
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  // search functionality

  const gptSearchButton = useSelector((store) => store?.gpt?.showGptSearches);
  // calling my custom hook
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  return (
    <div>
      <Header />
      {gptSearchButton ? (
        <GptSearch />
      ) : (
        <>
          {movies ? (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Browse;
