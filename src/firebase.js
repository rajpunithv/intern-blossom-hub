
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1ZVbE8n0Xqn4ahypwGCu3ha6tPMk_PBU",
    authDomain: "intern-blossom-hub.firebaseapp.com",
    projectId: "intern-blossom-hub",
    storageBucket: "intern-blossom-hub.firebasestorage.app",
    messagingSenderId: "181017387813",
    appId: "1:181017387813:web:18ea2f6d7bde6d0bbe30cc",
    measurementId: "G-CJ36C6QYQY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
