import React from "react";
import { img_cdn_url } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div>
      <img
        alt="movie-card-img"
        className="w-48 pr-8 mb-4"
        src={img_cdn_url + posterPath}
      />
    </div>
  );
};

export default MovieCard;
