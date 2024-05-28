import {
  UserCredential,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserAuthenticated } from "../types/Usertypes";
import { auth } from "../firebase.config";

export function login(user: UserAuthenticated): Promise<UserCredential> {
  try {
    setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, user.email, user.password);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
