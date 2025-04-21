// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Use correct values from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCMGhI69sIeyDV2rlk8k_LfqM4ZbWsS1ZQ",
  authDomain: "isp-education-cf69d.firebaseapp.com",
  projectId: "isp-education-cf69d",
  storageBucket: "isp-education-cf69d.appspot.com", // ✅ Fixed here
  messagingSenderId: "705836575724",
  appId: "1:705836575724:web:ddec8271198b566e96aec9",
  measurementId: "G-1MRJQHWJPF"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
