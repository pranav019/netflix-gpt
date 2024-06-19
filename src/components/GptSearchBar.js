import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openAi";

const GptSearchBar = () => {
  // use selector
  // In JavaScript, bracket notation [] is used to access object properties dynamically.

  // This is particularly useful when the property name is stored in a variable.

  const userLang = useSelector((store) => store?.config?.lang);
  const searchText = useRef(null);
  // ===================================
  const handleGptSearchClick = async () => {
    // make an API call to get the results
    const gptQuery =
      "Act as a Movie Recomendation system and suggest me some movies for the query " +
      searchText.current.value;

    console.log(searchText.current.value);
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: searchText.current.value }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResults.choices);
  };
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
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
  );
};

export default GptSearchBar;
