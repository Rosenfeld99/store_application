import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

export const updateImageToStorage = (file, directory, setState,setLoading,setError) => {
  setLoading(true)
  const storage = getStorage();
  const currentDate = Date.now();
  const storageRef = ref(storage, `${directory}/${currentDate}${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      setLoading(false)
      setError(true)
      // Handle unsuccessful uploads
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        setState(downloadURL);
        setLoading(false)
      });
    }
  );
};
