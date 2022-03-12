import { getLocalData, setLocalData } from './localStorageUtils';
import { signInWithEmail, createAccountWithEmail, signOut } from '../FirebaseUtils/firebaseAuthUtils';
import createUser from './createUser';


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
        return createUser(user.uid, user.displayName).then(() => {
            return user;
        })
    })
}