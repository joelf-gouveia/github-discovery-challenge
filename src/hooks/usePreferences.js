import { useState, useEffect } from "react";
import {
    addDocumentToSubcollection,
  deleteSpecificDocumentFromSubcollection,
  getAllDocumentsFromSubcollection,
  updateDocumentInSubcollection,
} from "../services/user.firebase";
import { useAuth } from "./AuthProvider";

const collection = "users";
const subCollection = "preferences";

const usePreferences = () => {
  const [preferences, setPreferences] = useState([]);
  const { user } = useAuth();
  console.log("user", user);

  useEffect(() => {
    onFetchPreferences();
  }, []);

  const onAddPreferences = async (newPreferences) => {
    await addDocumentToSubcollection(
        collection,
        user.uid,
        subCollection,
        newPreferences.id,
        newPreferences
    );

    setPreferences([ ...preferences, newPreferences ]);
  }

  const onFetchPreferences = async () => {
    const pf = await getAllDocumentsFromSubcollection(
      collection,
      user.uid,
      subCollection
    );

    setPreferences(pf);
  };

  const onDeletePreferences = async (preferenceId) => {
    await deleteSpecificDocumentFromSubcollection(
      collection,
      user.uid,
      subCollection,
      preferenceId
    );

    setPreferences(preferences.filter(pf => pf.id !== preferenceId))
  };

  const onUpdatePreferences = async (preferenceId, newPreferences) => {
    await updateDocumentInSubcollection(
      collection,
      user.uid,
      subCollection,
      preferenceId,
      newPreferences
    );

    const index = preferences.findIndex(pf => pf.id === preferenceId);
    const newValue = [...preferences];
    newValue[index] = newPreferences;
    setPreferences(newValue);
  };

  return {
    preferences,
    onAddPreferences,
    onFetchPreferences,
    onUpdatePreferences,
    onDeletePreferences,
  };
};

export default usePreferences;
