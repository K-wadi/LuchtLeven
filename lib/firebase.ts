import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC3f3woiNnbZLIMDIuFXnarfauTvQ7CDSs",
  authDomain: "luchtleven.firebaseapp.com",
  projectId: "luchtleven",
  storageBucket: "luchtleven.firebasestorage.app",
  messagingSenderId: "730300839394",
  appId: "1:730300839394:web:29a3a1897430d8b07435bb",
  measurementId: "G-RDCBZL9F97"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

// Only initialize analytics in the browser
let analytics: any = null
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics, isSupported }) => {
    isSupported().then((yes) => {
      if (yes) analytics = getAnalytics(app)
    })
  })
}

export { app, auth, db, analytics } 