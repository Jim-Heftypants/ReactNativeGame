import * as RTDB from '../Utils/firebaseRTDBUtils';
import * as Firestore from '../Utils/firebaseFirestoreUtils';
import { getLocalData, setLocalData } from './localStorageUtils';

import { shaHash } from "./hashingUtils";

export async function login(username, password) {
    const userID = shaHash(username, password);
    return RTDB.getData(`Users/${userID}`).then((data) => {
        if (!data) {
            console.log("Invalid user credentials -- userID ==", userID);
            return false;
        }
        setLocalData("UserID", userID);
        return { userID, data };
    })
}

export async function createAccount(username, password) {
    const userID = shaHash(username, password);
    return RTDB.getData(`Users/${userID}`).then((userData) => {
        if (userData) {
            console.log("User already exists -- userID ==", userID);
            return false;
        }
        RTDB.setData("Users/" + userID, { username });
        RTDB.setData(userID, getDefaultUserData(username));
        console.log("Created new account -- userID:", userID);
        setLocalData("UserID", userID);
        return userID;
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