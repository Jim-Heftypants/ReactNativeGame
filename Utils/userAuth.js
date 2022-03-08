import { getLocalData, setLocalData } from './localStorageUtils';
import { signInWithEmail, createAccountWithEmail, signOut } from '../FirebaseUtils/firebaseAuthUtils';

// import * as RTDB from '../FirebaseUtils/firebaseRTDBUtils';
// import * as Firestore from '../FirebaseUtils/firebaseFirestoreUtils';
// import { shaHash } from "./hashingUtils";

export async function loginWithLocalData() {
    return getLocalData('user').then((data) => {
        if (!data || !data.email || !data.password) return false;
        return login(data.email, data.password);
    })
}

export async function login(email, password) {
    return signInWithEmail(email, password).then((data) => {
        if (Array.isArray(data)) {
            console.log("Login failed!");
            console.log(data[0], data[1]);
            return false;
        }
        // data is a user
        return data;
    })
}

export async function createAccount(email, username, password) {
    return createAccountWithEmail(email, username, password).then((user) => {
        if (!user) return false;
        return user;
    })
}

const getDefaultUserData = (username) => {
    return {
        username,
        characterList: {},
        messages: {},
        friends: {},
    }
}


// Deprecated

// export async function login(username, password) {
//     const userID = shaHash(username, password);
//     return RTDB.getData(`Users/${userID}`).then((data) => {
//         if (!data) {
//             console.log("Invalid user credentials -- userID ==", userID);
//             return false;
//         }
//         setLocalData("UserID", userID);
//         return { userID, data };
//     })
// }
// export async function createAccount(username, password) {
//     const userID = shaHash(username, password);
//     return RTDB.getData(`Users/${userID}`).then((userData) => {
//         if (userData) {
//             console.log("User already exists -- userID ==", userID);
//             return false;
//         }
//         RTDB.setData("Users/" + userID, { username });
//         RTDB.setData(userID, getDefaultUserData(username));
//         console.log("Created new account -- userID:", userID);
//         setLocalData("UserID", userID);
//         return userID;
//     })
// }