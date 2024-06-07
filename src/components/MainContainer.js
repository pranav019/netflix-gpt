import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  // selecting the nowPlaying Movies of the store
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  if (movies === null) return;

  const mainMovie = movies[0];
  console.log("MAIN-MOVIE:-");
  console.log(mainMovie);

  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieID={id} />
    </div>
  );
};

export default MainContainer;
