import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDwctN0KROlwBXTTrUZlDo_2h0lMYt0dws",
  authDomain: "clone-18e27.firebaseapp.com",
  databaseURL: "https://clone-18e27.firebaseio.com",
  projectId: "clone-18e27",
  storageBucket: "clone-18e27.appspot.com",
  messagingSenderId: "719668890295",
  appId: "1:719668890295:web:62bc3b77999e97cc931b32",
  measurementId: "G-RXEMPEM5W9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };