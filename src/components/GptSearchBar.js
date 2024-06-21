import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAi";
import { api_options } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";
import Loader from "./Loader";

const GptSearchBar = () => {
  // use selector
  // In JavaScript, bracket notation [] is used to access object properties dynamically.

  // This is particularly useful when the property name is stored in a variable.

  const userLang = useSelector((store) => store?.config?.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // ===================================
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      api_options
    );
    const jsonData = await data.json();
    return jsonData.results;
  };
  const handleGptSearchClick = async () => {
    // make an API call to get the results
    setLoading(true);
    const gptQuery =
      "Act as a Movie Recomendation system and give me the result for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma seperated. Example like the example result given ahead, example result : Golmaal, Hera Pheri, PK, 3 idiots, Chupke Chupke. If there is a movie present that the user gave as query, then first show the movie name and then after that movie suggest the other 4 movies";

    // console.log(searchText.current.value);

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    // console.log(gptResults?.choices?.[0]?.message?.content.split(","));

    const gptMovies = gptResults?.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );

    setLoading(false);
  };
  return (
    <div>
      {loading && <Loader />}
      <div className="pt-[50%] md:pt-[25%] lg:pt-[10%] flex justify-center">
        <form
          className="w-full mx-[2%] md:w-9/12	lg:w-1/2 bg-black grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="p-4 m-4 col-span-9"
            placeholder={lang[userLang].getSearchPlaceholder}
          />
          <button
            className="py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {lang[userLang].search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
