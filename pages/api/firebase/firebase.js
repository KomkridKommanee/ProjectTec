// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHPtfIBSyoUBDkW6WvXYoFJBn5kiHM-_A",
  authDomain: "comscilru-a9742.firebaseapp.com",
  projectId: "comscilru-a9742",
  storageBucket: "comscilru-a9742.appspot.com",
  messagingSenderId: "896565218877",
  appId: "1:896565218877:web:e8aff825e6bc0707892454",
  measurementId: "G-NMCPPREKFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // เพิ่ม initialize Storage
const auth = getAuth(app); // Initialize Authentication

export { db, storage, auth }; // แก้ไขการ export เพื่อรวม Storage ด้วย