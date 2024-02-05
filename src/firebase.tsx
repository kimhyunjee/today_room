import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9w8dhyIy2UVgupasRCy4BC8Fm5hEOMRQ",
  authDomain: "today-room.firebaseapp.com",
  projectId: "today-room",
  storageBucket: "today-room.appspot.com",
  messagingSenderId: "742532638690",
  appId: "1:742532638690:web:62618df3f5174086c43bbb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//const user = auth.currentUser;
