import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkLoginData, checkSignUpData } from "../utils/validate";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
// store
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Login = () => {
  // useState Hooks
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // useRef hooks
  const email = useRef(null);
  const fullName = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Button functionalities
  // Password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Toggle sign in form
  const toggleSignInForm = () => {
    email.current.value = "";
    password.current.value = "";
    if (fullName.current) fullName.current.value = "";
    setErrorMessage(null);

    setIsSignInForm(!isSignInForm);
  };

  // User login && login data form
  const handleButtonClick = () => {
    const message = checkLoginData(email.current.value, password.current.value);
    // console.log(email.current.value);
    // console.log(password.current.value);
    setErrorMessage(message);
    if (message) return;

    setLoading(true);

    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " " + errorMessage);
      });
  };

  // user signup && signup data
  const handleSignUpClick = () => {
    const message = checkSignUpData(
      email.current.value,
      password.current.value,
      fullName.current.value
    );
    // console.log(email.current.value);
    // console.log(password.current.value);
    // console.log(fullName.current.value);

    setErrorMessage(message);
    if (message) return;
    setLoading(true);

    // Auth API Call on firebase
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        updateProfile(user, {
          displayName: fullName.current.value,
          photoURL:
            "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e",
        })
          .then(() => {
            // at first the values don't get store(bug) so to update the store we used this here
            // at fisrt the store will be updated and then it will take us to to browse page
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            navigate("/browse");
            console.log("Updated user: " + user);
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });

        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " " + errorMessage);
        // ..
      });
  };

  // main code starts
  return (
    <div>
      {/* {VVVV IMP : IF 100VH DOEST WORK USE 100CH !!!! IMPORTANT} */}

      <div>
        <Header />
        <div className="absolute h-screen">
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a99688ca-33c3-4099-9baa-07a2e2acb398/ca15fd28-b624-4852-8bfe-9cdd5c88475d/IN-en-20240520-popsignuptwoweeks-perspective_alpha_website_medium.jpg"></img>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-4/12 mx-auto p-12 bg-black my-36 absolute right-0 left-0 text-white bg-opacity-80"
        >
          <h1 className="font-bold text-3xl py-4 ">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {isSignInForm ? null : (
            <>
              {" "}
              <input
                ref={fullName}
                type="text"
                placeholder="Full Name"
                className="p-4 my-4 w-full bg-gray-600 rounded-md"
              />
            </>
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-600 rounded-md"
          />

          <div className="relative my-4">
            <input
              ref={password}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="p-4 w-full bg-gray-600 rounded-md pr-12"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 p-4 text-gray-400 hover:text-gray-200"
            >
              {isPasswordVisible ? (
                <FaEyeSlash className="w-10 h-6" />
              ) : (
                <FaEye className="w-10 h-6" />
              )}
            </button>
          </div>

          <p className="text-red-500 text-sm font-bold px-1">{errorMessage}</p>

          <button
            className="p-4 my-6 bg-red-700 w-full rounded-lg"
            onClick={isSignInForm ? handleButtonClick : handleSignUpClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {isSignInForm ? (
            <p className="py-4">
              New to Netflix?{" "}
              <span
                className="underline cursor-pointer"
                onClick={toggleSignInForm}
              >
                Sign up now
              </span>
            </p>
          ) : (
            <p className="py-4">
              Already a Netflix user?{" "}
              <span
                className="underline cursor-pointer"
                onClick={toggleSignInForm}
              >
                Sign in now
              </span>
            </p>
          )}
        </form>
      </div>

      {/* {LOADER} */}
      {loading && <Loader />}
    </div>
  );
};

export default Login;