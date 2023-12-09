import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const getUserExists = async (user, setCurrentUser) => {
  const docRef = doc(db, "users", user?.uid);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User already exists:", docSnap.data());
      //   if have argument state updated!
      setCurrentUser && setCurrentUser(docSnap.data());
      return true; // User exists
    } else {
      console.log("User does not exist");
      return false; // User does not exist
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    return false; // Assume user does not exist in case of an error
  }
};
