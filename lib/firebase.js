// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuj_5hKS8UJzxfSw29YYIkZgwiF8zCIhY",
  authDomain: "mindmate-38e25.firebaseapp.com",
  projectId: "mindmate-38e25",
  storageBucket: "mindmate-38e25.appspot.com",
  messagingSenderId: "323715113907",
  appId: "1:323715113907:web:702cbce060af449d3661c6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
