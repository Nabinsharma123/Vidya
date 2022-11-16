
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyD9lxU6jmEFWY0Yp-zvAjKJZqj84ibGQzs",
    authDomain: "vidya-5fe5d.firebaseapp.com",
    projectId: "vidya-5fe5d",
    storageBucket: "vidya-5fe5d.appspot.com",
    messagingSenderId: "218827026310",
    appId: "1:218827026310:web:a4aed8bf7f33a263708607",
    measurementId: "G-GEJYXDXLBB"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storge = getStorage(app)