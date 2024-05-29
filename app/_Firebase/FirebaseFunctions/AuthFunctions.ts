import {
  UserCredential,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { NewUser, UserAuthenticated } from "../types/Usertypes";
import { auth } from "../firebase.config";


// This function allow us to login in our account
export function login(user: UserAuthenticated): Promise<UserCredential> {
  try {
    setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, user.email, user.password);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

// This function allow us to create a new user
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

// This functions allow us to update a new user
export function updateUser(user: { displayName?: string | null | undefined , photoURL?: string | null | undefined;} ){
  if(auth.currentUser) return updateProfile(auth.currentUser, user)
}

// This functions allow us to recover a user password

export function recoverPass(email: string){
  return sendPasswordResetEmail(auth, email)
}