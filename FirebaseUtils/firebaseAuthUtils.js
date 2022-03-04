import { getAuth, signInWithCustomToken, createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, deleteUser } from "firebase/auth";
import app from '../firebaseApp';

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

export async function signOut() {
    return signOut(auth).then(() => {
        // Sign-out successful.
        return true;
      }).catch((error) => {
          // An error happened.
          console.log(error);
          return false;
      });
}

export async function createAccountWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

export async function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}