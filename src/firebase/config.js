// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAF1ITaj5ssa7No_H9-mO_yEqYZmDxkiUE",
    authDomain: "crawlnbeer.firebaseapp.com",
    projectId: "crawlnbeer",
    storageBucket: "crawlnbeer.appspot.com",
    messagingSenderId: "123487080839",
    appId: "1:123487080839:web:72a4443b44e6f1753c0322"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }