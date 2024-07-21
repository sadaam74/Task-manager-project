import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCesdJYFVrEuRV27UziD64072q70dU_Nn4",
  authDomain: "task-manager-9809b.firebaseapp.com",
  projectId: "task-manager-9809b",
  storageBucket: "task-manager-9809b.appspot.com",
  messagingSenderId: "911255260728",
  appId: "1:911255260728:web:afe40f7d8abae4e588a0cd"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
