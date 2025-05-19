import { 
  createUserWithEmailAndPassword as firebaseCreateUser,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth"
import { auth } from "./firebase"
import { validateEmail, validatePassword } from "./security"

export interface User {
  uid: string
  email: string
}

export const createUserWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  if (!validateEmail(email)) {
    throw new Error("Ongeldig e-mailadres")
  }

  if (!validatePassword(password)) {
    throw new Error("Wachtwoord moet minimaal 8 tekens bevatten, waarvan 1 hoofdletter, 1 kleine letter en 1 cijfer")
  }

  try {
    const userCredential = await firebaseCreateUser(auth, email, password)
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
    }
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("E-mailadres is al in gebruik")
    }
    throw new Error("Er is een fout opgetreden bij het registreren")
  }
}

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await firebaseSignIn(auth, email, password)
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
    }
  } catch (error: any) {
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      throw new Error("Ongeldige inloggegevens")
    }
    throw new Error("Er is een fout opgetreden bij het inloggen")
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    throw new Error("Er is een fout opgetreden bij het uitloggen")
  }
}

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return firebaseOnAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
      })
    } else {
      callback(null)
    }
  })
} 