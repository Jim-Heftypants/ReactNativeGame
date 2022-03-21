import { getDatabase, ref, set, child, get, push } from "firebase/database";
import app from '../../firebaseApp';

const db = getDatabase(app);

export async function pushData(path, data) {
    return push(child(ref(db), path), data);
}

export async function setData(path, data) {
    const reference = ref(db, path);
    return await set(reference, data);
}

export async function getData(path) {
    const referencePath = getChild(path);
    // console.log(referencePath);
    return get(referencePath).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Data retrieved ==", snapshot.val());
            return snapshot.val();
        }
        console.log("No data available");
        return null;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

export async function updateKey(path, oldKey, newKey) {
    return getData(path + '/' + oldKey).then((data) => {
        if (data !== null) {
            return getData(path + '/' + newKey).then((otherData) => {
                if (otherData) {
                    console.log("Data found at new key -- rejected to not overwrite");
                    return false;
                }
                setData(path + '/' + newKey, data);
                setData(path + '/' + oldKey, null);
                return true;
            }).catch((err) => {
                console.log("Error in getData");
                return false;
            })
        } else {
            console.log("Null found for data to update");
            return false;
        }
    })
}

function getChild(path) {
    return child(ref(db), path);
}