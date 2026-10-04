import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCfMRnpRUWNuQiTB322Oc_jIa1SJJxIWMg",
  authDomain: "mostuid-ff5500.firebaseapp.com",
  projectId: "mostuid-ff5500",
  storageBucket: "mostuid-ff5500.firebasestorage.app",
  messagingSenderId: "790071510316",
  appId: "1:790071510316:web:429ce17d2a783b47fb1889",
  measurementId: "G-L3FR1BLEN9",
  databaseURL: "https://mostuid-ff5500-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
