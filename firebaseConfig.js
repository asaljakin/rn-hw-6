import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZR3H2yB-ep6p_NvZF_ksWkQFkrdBj3mk",
  authDomain: "goitreactnative-9402e.firebaseapp.com",
  projectId: "goitreactnative-9402e",
  storageBucket: "gs://goitreactnative-9402e.firebasestorage.app",
};
const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


export const db = getFirestore(app);
export const storage = getStorage(app);
