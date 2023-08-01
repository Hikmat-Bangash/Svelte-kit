
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  PUBLIC_apiKey,
  PUBLIC_authDomain,
  PUBLIC_projectId,
  PUBLIC_storageBucket,
  PUBLIC_messagingSenderId,
  PUBLIC_appId
} from "$env/static/public";

//web app's Firebase configuration
const firebaseConfig = {
   
  apiKey: PUBLIC_apiKey,
  authDomain: PUBLIC_authDomain,
  projectId:  PUBLIC_projectId,
  storageBucket: PUBLIC_storageBucket,
  messagingSenderId: PUBLIC_messagingSenderId,
  appId: PUBLIC_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
