// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc20O19nZhZRMDVEOKTIUesxLP6rLdYRQ",
  authDomain: "auth01-4fe46.firebaseapp.com",
  projectId: "auth01-4fe46",
  storageBucket: "auth01-4fe46.appspot.com",
  messagingSenderId: "170853809382",
  appId: "1:170853809382:web:20864aa8d385c67fe5cf27",
  measurementId: "G-CLXXLMEXCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;