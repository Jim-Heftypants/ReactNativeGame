import { getData, setData } from '../FirebaseUtils/firebaseRTDBUtils';

export default async function createUser(userID, username) {
    return getData(userID).then((data) => {
        if (data) {
            console.log("User already exists");
            return false;
        }
        const userObj = {
            username,
            characterList: [],
            conversations: {},
            friends: {},
            achievements: {},
        }
        return setData(userID, userObj).then(() => {
            return userObj;
        })
    });
}