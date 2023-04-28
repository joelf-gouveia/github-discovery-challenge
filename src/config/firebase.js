import { initializeApp }from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "github-discovery-challenge.firebaseapp.com",
  projectId: "github-discovery-challenge",
  storageBucket: "github-discovery-challenge.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase modules that you need to use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);