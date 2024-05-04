import 'firebase/storage';
import {getStorage} from 'firebase/storage';
import {initializeApp} from "firebase/app"
import { getFirestore, addDoc as firestoreAddDoc, collection as firestoreCollection, getDocs as firestoreGetDocs, Timestamp as firestireTimestamp } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
const firebaseApp = initializeApp(firebaseConfig);
const dateTimetampNow = firestireTimestamp.now();
export const analytics = getAnalytics(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp)
export const addDoc = firestoreAddDoc;
export const collection = firestoreCollection;
export const getDocs = firestoreGetDocs;
export const Timestamp = dateTimetampNow;