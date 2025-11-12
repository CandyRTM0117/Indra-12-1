// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDf98s55S3a3TOYGYHxBf6E_JAKg99qU_E",
  authDomain: "huviar-5b906.firebaseapp.com",
  databaseURL: "https://huviar-5b906-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "huviar-5b906",
  storageBucket: "huviar-5b906.firebasestorage.app",
  messagingSenderId: "771542679477",
  appId: "1:771542679477:web:be5456e5417b1cc93b63fc",
  measurementId: "G-N1892M58VE"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
