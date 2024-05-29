import {
  UserCredential,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { NewUser, UserAuthenticated } from "../types/Usertypes";
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

export function signUp(userAuth: NewUser): Promise<UserCredential> {
    try {
      setPersistence(auth, browserSessionPersistence);
      return createUserWithEmailAndPassword(auth, userAuth.email, userAuth.password)
        // .then(async () => {
        //   const user = auth.currentUser;
        //   try {
        //     if (user) {
        //       await updateProfile(user, {
        //         displayName: userAuth.displayName,
        //       });
        //     }
        //   } catch (error) {
        //     console.error("No se pudo obtener el usuario actual.");
        //     reject(false); // Reject promise in error case
        //   }
        // })
        // .catch((error) => {
        //   console.error("Error en signUp:", error);
        //   reject(false); // reject promise in error case when create new user
        // });
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
}
