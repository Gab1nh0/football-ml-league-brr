import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFGot4D3fUECBQrCCebfK1dQm7A-ZwuHY",
    authDomain: "footballleague-479b8.firebaseapp.com",
    projectId: "footballleague-479b8",
    storageBucket: "footballleague-479b8.appspot.com",
    messagingSenderId: "842357603939",
    appId: "1:842357603939:web:611f6767c3b81971a8c256",
    measurementId: "G-7J1WRSB8YK"
};

let firebaseApp: FirebaseApp;
let db: Firestore;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
} else {
  firebaseApp = getApps()[0];
  db = getFirestore(firebaseApp);
}

export { db };