// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAHQImFWd1j9xJVtLfEw-QKzFDzU-rD0U",
    authDomain: "coachifytree-15cd9.firebaseapp.com",
    projectId: "coachifytree-15cd9",
    storageBucket: "coachifytree-15cd9.appspot.com",
    messagingSenderId: "534974093283",
    appId: "1:534974093283:web:2c819ae41f17cdc9f332d6",
    measurementId: "G-FR745VFZ4Y"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const analytics = getAnalytics(app);

export {auth};