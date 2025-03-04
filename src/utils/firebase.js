// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN2TFUUe3zx69ud_DpmroA339MpzHRe1s",
  authDomain: "finelmedia.firebaseapp.com",
  databaseURL: "https://finelmedia-default-rtdb.firebaseio.com",
  projectId: "finelmedia",
  storageBucket: "finelmedia.firebasestorage.app",
  messagingSenderId: "736847974937",
  appId: "1:736847974937:web:e436e7b071387e7b58d088",
  measurementId: "G-25XBGDGENX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app