// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLl5kgRRYvsQ3Y4u5bDsvp_TW9KIpoKgA",
  authDomain: "claros-village.firebaseapp.com",
  projectId: "claros-village",
  storageBucket: "claros-village.appspot.com",
  messagingSenderId: "973845316447",
  appId: "1:973845316447:web:dd3f2a8509fb8ebb3d6cea",
  measurementId: "G-FNGE2T7XNS"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)

export const db = getFirestore(app)
