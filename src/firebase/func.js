import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
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

export const fetchAllProducts = async (setState) => {

  try {
      const dataList = []
      const q = query(collection(db, "products"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          dataList.push({ id: doc.id, name: doc.data()?.name, imageSrc: doc.data()?.images[0]?.src,imageAlt: doc.data()?.images[0]?.alt })
          // console.log(doc.id, " => ", doc.data());
      });
      setState(dataList)
  } catch (error) {
      console.log(error);
  }
}
