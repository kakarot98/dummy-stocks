// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from '@firebase/firestore'

// import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxqeBoT5nyrn2dHEVLLT5p5u0-hPmdYW0",
  authDomain: "protium-backend.firebaseapp.com",
  projectId: "protium-backend",
  storageBucket: "protium-backend.appspot.com",
  messagingSenderId: "409790677415",
  appId: "1:409790677415:web:ed5a0f270c5319b3c7f682"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth()

export const db = getFirestore()