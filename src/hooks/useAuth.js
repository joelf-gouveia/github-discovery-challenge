import { useState } from "react";
import { auth } from "../config/firebase";

export const useAuth = () => {
  const [currentUser, setUser] = useState(auth.currentUser);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  return currentUser;
};
