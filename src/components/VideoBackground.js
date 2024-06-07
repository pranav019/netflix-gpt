import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieID }) => {
  // custom hook for getting movie trailer
  useMovieTrailer(movieID);

  // getting data from the store
  const backgroundTrailer = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${backgroundTrailer?.key}?&autoplay=1&controls=0&loop=1&modestbranding=1&showinfo=0&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
