import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 인증 추가
import { getFirestore } from "firebase/firestore"; // firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUestgFD525KPxQxll3HncpDW-vupMRn0",
  authDomain: "beebeer-d4f0d.firebaseapp.com",
  projectId: "beebeer-d4f0d",
  storageBucket: "beebeer-d4f0d.appspot.com",
  messagingSenderId: "848788715734",
  appId: "1:848788715734:web:bdc9c697ac89fb449e3177",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // 인증 추가
export const db = getFirestore(app); //데이터베이스 연결
