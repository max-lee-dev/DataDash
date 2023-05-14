import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPwoXBRTcmYI9iKVIn7f9leinXoijxAAs",
  authDomain: "datadash-5d1cf.firebaseapp.com",
  projectId: "datadash-5d1cf",
  storageBucket: "datadash-5d1cf.appspot.com",
  messagingSenderId: "1050402695559",
  appId: "1:1050402695559:web:94fdc6cef652472b7dcb22",
  measurementId: "G-Z7N0HYS05Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const signInWithGoogle = () => signInWithPopup(auth, provider);
