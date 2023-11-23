import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyC5Da0ogZyAWXBlxb3qU2W07snoRavV3OE",
  authDomain: "netflix-clone-b487a.firebaseapp.com",
  projectId: "netflix-clone-b487a",
  storageBucket: "netflix-clone-b487a.appspot.com",
  messagingSenderId: "305016971151",
  appId: "1:305016971151:web:8e94b597ff60e209ad75fa",
  measurementId: "G-T5SSBYTCWK"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)