import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCoxkZvQiNLd-wZrqSJB8dKE2EyHJ11O8U",
    authDomain: "hercules-fc42e.firebaseapp.com",
    projectId: "hercules-fc42e",
    storageBucket: "hercules-fc42e.appspot.com",
    messagingSenderId: "501456721475",
    appId: "1:501456721475:web:7cc30d4a6c8f34320826f6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authInstance = getAuth();

export { app, db, authInstance };
