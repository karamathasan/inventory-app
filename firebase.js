// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore' 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGTcrLLue3EBhf7eju1RsePx_8pBsfUuA",
  authDomain: "pantryapp-daf18.firebaseapp.com",
  projectId: "pantryapp-daf18",
  storageBucket: "pantryapp-daf18.appspot.com",
  messagingSenderId: "847076659087",
  appId: "1:847076659087:web:b80150a517483196ab45fa",
  measurementId: "G-XQZ78XMR7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app, firestore}
// const analytics = getAnalytics(app);