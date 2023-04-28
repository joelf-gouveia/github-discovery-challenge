import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail
} from "firebase/auth";

export const login = async (email, password) => {
  // Sign in with email and pass.
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signup = async (email, password) => {
  // Create user with email and pass.
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const updateUser = async ({ displayName, email }) => {
 // Update the user profile with email and name
 if (displayName) {
  await updateProfile(auth.currentUser, { displayName });
 }

 if (email) {
  await updateEmail(auth.currentUser, email);
 }

 auth.currentUser.reload()
 return;
}

export const signout = () => {
  signOut(auth);
};
