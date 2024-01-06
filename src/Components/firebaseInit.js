// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4BY6SCMADXPUWpb5DCC-7NW_Iwkp5jJI",
  authDomain: "blogapp-deca6.firebaseapp.com",
  projectId: "blogapp-deca6",
  storageBucket: "blogapp-deca6.appspot.com",
  messagingSenderId: "9240329694",
  appId: "1:9240329694:web:c10947ad168fa629f9b14f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
