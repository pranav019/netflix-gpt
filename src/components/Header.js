import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // store varibales
  const dispatch = useDispatch();

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

    onAuthStateChanged(auth, (user) => {
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
    });
  }, []);
  return (
    <div>
      <div className="absolute w-full ps-8 py-3 bg-gradient-to-b from-black z-10 flex justify-between">
        <img
          className="w-44"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        ></img>
        {user && (
          <div className="flex p-2">
            <img
              className="w-12 h-12 mt-2"
              alt="userIcon"
              // src="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"

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
