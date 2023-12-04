import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const fetchDoc = async (userId , collaction) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
