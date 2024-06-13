import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  // use selector
  // In JavaScript, bracket notation [] is used to access object properties dynamically.

  // This is particularly useful when the property name is stored in a variable.
  const userLang = useSelector((store) => store?.config?.lang);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[userLang].getSearchPlaceholder}
        />
        <button className="py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounded-lg">
          {lang[userLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
