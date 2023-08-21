import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqA00mfJM56hXHzp8JThuzCMCAi4Jxx50",
  authDomain: "nwitter-6d6ae.firebaseapp.com",
  projectId: "nwitter-6d6ae",
  storageBucket: "nwitter-6d6ae.appspot.com",
  messagingSenderId: "640695840076",
  appId: "1:640695840076:web:a8d9743af10998bd1833e9"
};
  

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
export default firebase;