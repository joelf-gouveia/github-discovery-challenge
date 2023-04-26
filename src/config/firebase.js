import { initializeApp, firebase } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: PROCESS.ENV.FIREBASE_API_KEY,
  authDomain: "github-discovery-challenge.firebaseapp.com",
  projectId: "github-discovery-challenge",
  storageBucket: "github-discovery-challenge.appspot.com",
  messagingSenderId: PROCESS.ENV.FIREBASE_MESSAGE_SENDER_ID,
  appId: PROCESS.ENV.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase modules that you need to use in your app
export const auth = firebase.auth();
export const firestore = firebase.firestore();