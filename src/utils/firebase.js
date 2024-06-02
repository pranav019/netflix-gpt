// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq20GA8WsakFAi27m2We_IcnEtx-zGeB4",
  authDomain: "netflixgpt-c414e.firebaseapp.com",
  projectId: "netflixgpt-c414e",
  storageBucket: "netflixgpt-c414e.appspot.com",
  messagingSenderId: "901394144794",
  appId: "1:901394144794:web:295dab98e99bd7cf1e7ba3",
  measurementId: "G-7VRZ8T7VP3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth
export const auth = getAuth();
