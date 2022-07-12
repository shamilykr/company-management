import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore/lite";
import {
  EMAIL_ALREADY_USED_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from "constants/errorCodes";
import { app, auth } from "../firebase";

const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// Function to handle google sign in
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Function to handle login with email and password
export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  callback: (arg) => void
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (
      err.code === USER_NOT_FOUND_ERROR ||
      err.code === WRONG_PASSWORD_ERROR
    ) {
      // If no user found register that user
      registerWithEmailAndPassword(
        "",
        email,
        password,
        err.code === WRONG_PASSWORD_ERROR,
        callback
      );
    } else {
      // TODO - Display error messages in page
      console.error(err);
    }
  }
};

// Function to hanlde register and add user to database
export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  isWrongPasswordError: boolean,
  callback: (arg) => void
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    if (err.code === EMAIL_ALREADY_USED_ERROR && isWrongPasswordError) {
      callback(true);
    }
    console.error(err);
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    // TODO - Display error messages in page
  }
};

// Function for logout functionality
export const logout = () => {
  signOut(auth);
};
