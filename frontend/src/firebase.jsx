// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const apikey=import.meta.env.VITE_apikey;
// console.log(apikey);
const firebaseConfig = {
    
    apiKey: import.meta.env.VITE_apikey,

    authDomain: import.meta.env.VITE_authDomain,

    projectId: import.meta.env.VITE_projectId,

    storageBucket: import.meta.env.VITE_storageBucket,

    messagingSenderId: import.meta.env.VITE_messagingSenderId,

    appId: import.meta.env.VITE_appId,
    
    measurementId: import.meta.env.VITE_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const analytics = getAnalytics(app);

export {auth};