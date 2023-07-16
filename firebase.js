import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcI1ULu0PnZ3S4GiqhRUgai4-Om_qNM5I",
  authDomain: "laundry-app-3b31b.firebaseapp.com",
  projectId: "laundry-app-3b31b",
  storageBucket: "laundry-app-3b31b.appspot.com",
  messagingSenderId: "439182527248",
  appId: "1:439182527248:web:d3b9ef499865f660b47395"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();

export {auth,db};