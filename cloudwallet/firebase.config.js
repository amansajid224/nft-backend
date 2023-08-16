// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDckBBxRja08eSLQrqJd9ZWopRdWhtPtU8",
  authDomain: "elysium-cloud-wallet.firebaseapp.com",
  projectId: "elysium-cloud-wallet",
  storageBucket: "elysium-cloud-wallet.appspot.com",
  messagingSenderId: "457743600372",
  appId: "1:457743600372:web:540f81cc07b785c060aca1",
  measurementId: "G-Y5Y51BB2ZS"
};

// Initialize Firebase
let analytics;
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth();
if(app.name && typeof window !=='undefined'){

    analytics = getAnalytics(app)
}


export {app, db, storage,auth, analytics}