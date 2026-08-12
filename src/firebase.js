import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBv8E2YhL48YtUPr2kW25crRpa3Cyalh0U",
  authDomain: "noobtofit-2026-stuff.firebaseapp.com",
  projectId: "noobtofit-2026-stuff",
  storageBucket: "noobtofit-2026-stuff.firebasestorage.app",
  messagingSenderId: "48857994040",
  appId: "1:48857994040:web:9b07871421b4e829f627cd",
  measurementId: "G-WM5ZYBVLFJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// experimentalAutoDetectLongPolling: falls back to long-polling instead of
// QUIC/WebChannel when the network blocks it (fixes QUIC_NETWORK_IDLE_TIMEOUT)
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
