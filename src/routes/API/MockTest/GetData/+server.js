import { json } from '@sveltejs/kit';

import {
    collection,
    doc,
    getDoc,
    setDoc,
    getDocs,
    addDoc,
    query,
    where,
    updateDoc,
} from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: "AIzaSyD9lxU6jmEFWY0Yp-zvAjKJZqj84ibGQzs",
//     authDomain: "vidya-5fe5d.firebaseapp.com",
//     projectId: "vidya-5fe5d",
//     storageBucket: "vidya-5fe5d.appspot.com",
//     messagingSenderId: "218827026310",
//     appId: "1:218827026310:web:a4aed8bf7f33a263708607",
//     measurementId: "G-GEJYXDXLBB"
// };
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);


export async function POST({ request }) {
    const { MockTestId } = await request.json()
    console.log(MockTestId);
    var data = await getDoc(doc(db, "SubjectList", "List"))
    // data.forEach((doc) => {
    console.log(data.data());
    // })
    return json({ "ok": "ok" })
}