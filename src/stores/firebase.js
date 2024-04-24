// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoW1OH4_Zc3Qq5rML1-9xrs1TEz9nh0AQ",
  authDomain: "fdwl-4f0e0.firebaseapp.com",
  projectId: "fdwl-4f0e0",
  storageBucket: "fdwl-4f0e0.appspot.com",
  messagingSenderId: "113163479988",
  appId: "1:113163479988:web:12fdcefb613b5afc32e0e1",
  measurementId: "G-SEZNXNEW70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//initialize firebase auth
const auth = getAuth()

export { app, auth, db }
