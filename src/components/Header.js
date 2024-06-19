import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { logo } from "../utils/constants";
import { toggleGptSerachView, clearGptResults } from "../utils/gptSlice";
import { supported_languages } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // store varibales
  const dispatch = useDispatch();
  const gptSearch = useSelector((store) => store?.gpt?.showGptSearches);

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setLoading(true);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // An error happened.
      });
  };

  useEffect(() => {
    // only want to call this api only once(after my component renders), therefore used useEffect hook
    // useEffect is called after the api calls are made (re-rendering of the page)
    // get currently signed in user/ sign out user
    // it will check if the there is user state change
    // whenever there is something auth change

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // if user has signed in
      if (user) {
        // what all data we can get from "user" store
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // if user sign outs
        dispatch(removeUser());
        // this navigate function will work on here
        navigate("/");
      }
      // I want to unsubscribe when the component unmounts
      return () => unsubscribe();
    });
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    // toggle my GptSearch
    if (gptSearch) {
      dispatch(clearGptResults());
    }
    dispatch(toggleGptSerachView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div>
      <div className="absolute w-full ps-8 py-3 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44" src={logo} alt="logo"></img>
        {user && (
          <div className="flex p-2">
            {gptSearch && (
              <div className="flex content-end flex-wrap mb-2 ">
                <select
                  className="p-2 px-4 rounded-lg text-white font-bold h-max mr-5 bg-gray-900"
                  onChange={handleLanguageChange}
                >
                  {supported_languages.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex content-end flex-wrap mb-2 ">
              <button
                className="p-2 px-4 rounded-lg text-black font-bold h-max mr-5 bg-white "
                onClick={handleGptSearchClick}
              >
                {gptSearch ? "Go Back" : "GPT Search"}
              </button>
            </div>
            <img
              className="w-12 h-12 mt-2"
              alt="userIcon"
              src={user?.photoURL}
            ></img>
            <button
              className="font-bold text-white ms-4"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            {/* <h1 className="bg-green-500 text-red-500">
            {user.displayName + " " + user.email}
          </h1> */}
          </div>
        )}
      </div>

      {/* {LOADER} */}
      {loading && <Loader />}
    </div>
  );
};

export default Header;
