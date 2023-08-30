// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYi64mXs0GWiE8TcR9Lj10B35VAUWbgy4",
  authDomain: "twitter-clone-3ed19.firebaseapp.com",
  projectId: "twitter-clone-3ed19",
  storageBucket: "twitter-clone-3ed19.appspot.com",
  messagingSenderId: "660342115673",
  appId: "1:660342115673:web:b260156ab6de8d67acd048",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
