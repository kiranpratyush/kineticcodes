
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAeoDNlEO1OMx0k9p8d3H5773PlYGci0A",
    authDomain: "chatbot-ab6da.firebaseapp.com",
    projectId: "chatbot-ab6da",
    storageBucket: "chatbot-ab6da.appspot.com",
    messagingSenderId: "64428607422",
    appId: "1:64428607422:web:0cd03a8b878bef12109bef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };


