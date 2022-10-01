// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa-TagFrRiFXZPzaZAnPhhRL3NsUGbOiY",
  authDomain: "to-do-react-firebase-7c900.firebaseapp.com",
  projectId: "to-do-react-firebase-7c900",
  storageBucket: "to-do-react-firebase-7c900.appspot.com",
  messagingSenderId: "899791795543",
  appId: "1:899791795543:web:7889792d2af7429affba12"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };