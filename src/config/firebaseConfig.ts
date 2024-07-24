
import { initializeApp } from '@firebase/app';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
const FIREBASE_API_KEY="AIzaSyArRb_1uZWjngLM49W-w63n8X_atwEFArg"
const FIREBASE_AUTH_DOMAIN="note-taking-bb8c5.firebaseapp.com"
const FIREBASE_PROJECT_ID="note-taking-bb8c5"
const FIREBASE_STORAGE_BUCKET="note-taking-bb8c5.appspot.com"
const FIREBASE_MESSAGING_SENDER_ID="18247991873"
const FIREBASE_APP_ID="1:18247991873:web:06c97028374cc5d3acbcc0"

export const firebaseConfig = {
  apiKey:FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket:FIREBASE_STORAGE_BUCKET ,
  messagingSenderId:FIREBASE_MESSAGING_SENDER_ID ,
  appId: FIREBASE_APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
 const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(firebaseApp);
// if (!firebase.apps.length) {
// //   app=firebase.initializeApp(firebaseConfig);
// // }
//  firebaseApp = firebase.initializeApp(firebaseConfig);

// }
export {firebaseApp,auth,db};
