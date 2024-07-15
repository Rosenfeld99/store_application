import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
