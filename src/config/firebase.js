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

export const handleFirebaseError = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/user-not-found":
      return "User not found.";
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "auth/weak-password":
      return "Password is too weak. Please choose a stronger password.";
    case "cancelled":
      return "The operation was cancelled.";
    case "invalid-argument":
      return "The data provided is invalid.";
    case "not-found":
      return "The requested document or collection was not found.";
    case "already-exists":
      return "The document or collection already exists.";
    case "permission-denied":
      return "You do not have permission to perform this operation.";
    case "unauthenticated":
      return "You need to be authenticated to perform this operation.";
    case "unavailable":
      return "The service is currently unavailable. Please try again later.";
    case "deadline-exceeded":
      return "The operation timed out.";
    default:
      return "An error occurred. Please try again later.";
  }
};