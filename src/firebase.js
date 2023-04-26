import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBqb4lm8WWnk3tXS2y2isr3F8ANJPBAwn4",
  authDomain: "todos-afbb3.firebaseapp.com",
  projectId: "todos-afbb3",
  storageBucket: "todos-afbb3.appspot.com",
  messagingSenderId: "1063579081397",
  appId: "1:1063579081397:web:801ffd9e2813d944327cfc"
};

export const app = initializeApp(firebaseConfig);