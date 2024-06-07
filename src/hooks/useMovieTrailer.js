import { useEffect } from "react";
import { api_options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideos } from "../utils/movieSlice";

const useMovieTrailer = (movieID) => {
  const dispatch = useDispatch();

  // fetch my trailer here
  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
      api_options
    );

    const jsonData = await data.json();

    const filteredTrailers = jsonData?.results?.filter(
      (video) => video?.type === "Trailer"
    );

    const trailer =
      filteredTrailers?.length > 0 ? filteredTrailers[0] : jsonData?.results[0];

    console.log(filteredTrailers);
    dispatch(addTrailerVideos(trailer));
  };

  // using useEffect to call the functions
  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
