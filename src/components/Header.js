import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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
  return (
    <div>
      <div className="absolute w-screen ps-8 py-3 bg-gradient-to-b from-black z-10 flex justify-between">
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
