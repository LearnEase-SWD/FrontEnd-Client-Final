import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfABck7Ffd9jSYoJVOFdGpztWmlfdDRWg",
  authDomain: "edumaster-3e1b3.firebaseapp.com",
  projectId: "edumaster-3e1b3",
  storageBucket: "edumaster-3e1b3.appspot.com",
  messagingSenderId: "952476368416",
  appId: "1:952476368416:web:fdc94ade6d748673560645",
  measurementId: "G-RCYFJ83MH4",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

