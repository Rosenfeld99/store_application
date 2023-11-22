import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA79ffYwbVQqgt3HWrvNZf8LgOdY3PGJQQ",
  authDomain: "store-app-react-19cd0.firebaseapp.com",
  projectId: "store-app-react-19cd0",
  storageBucket: "store-app-react-19cd0.appspot.com",
  messagingSenderId: "813709387323",
  appId: "1:813709387323:web:12282ad13898d099b91e1e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);