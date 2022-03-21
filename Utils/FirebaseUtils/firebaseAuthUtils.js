import { getAuth, signInWithCustomToken, createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, deleteUser, updateProfile } from "firebase/auth";
import app from '../../firebaseApp';

import { getLocalData, setLocalData } from "../databaseUtils/localStorageUtils";

const auth = getAuth(app);
// const user = auth.currentUser();

export async function signInCustom(token) {
    return signInWithCustomToken(auth, token).then((userCredential) => {
            // Signed in
            return userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            return false;
        });
}

export async function signOutUser() {
    return signOut(auth).then(() => {
        // Sign-out successful.
        return true;
      }).catch((error) => {
          // An error happened.
          console.log(error);
          return false;
      });
}

export async function createAccountWithEmail(email, username, password) {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return updateProfile(user, { displayName: username }).then(() => {
            return setLocalData("user", { email, password }).then(() => {
                    return user
                }).catch((error) => {
                    console.log("Error with setting local data");
                    return user;
                })
        })}).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Account creation failed!:", errorMessage);
            return false;
            // return [errorCode, errorMessage];
        });
}

export async function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        return setLocalData("user", { email, password }).then((data) => {
            return userCredential.user;
            }).catch((error) => {
                console.log("Error with setting local data");
                return userCredential.user;
            })
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return [errorCode, errorMessage];
        });
}