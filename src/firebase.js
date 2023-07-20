import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB0ki15xnDYtslnaArIsE9M3RpZQWtkaSA",
  authDomain: "otp-trial-3a8b0.firebaseapp.com",
  projectId: "otp-trial-3a8b0",
  storageBucket: "otp-trial-3a8b0.appspot.com",
  messagingSenderId: "810841423493",
  appId: "1:810841423493:web:0f98cf140381c4b86cb3ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
