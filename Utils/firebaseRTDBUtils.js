import { getDatabase, ref, set, child, get, once } from "firebase/database";
import app from '../firebaseApp';

const db = getDatabase(app);

async function setData(path, data) {
    const reference = ref(db, path);
    await set(reference, data);
    // console.log("fourth");
}

async function getData(path, key) {
    const referencePath = getChild(path, key);
    console.log(referencePath);
    get(referencePath).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Data retrieved ==", snapshot.val());
            // console.log("second");
            return snapshot.val();
        }
        console.log("No data available");
        return null;
    }).catch((error) => {
        console.error(error);
        return null;
    });
}

async function updateKey(path, oldKey, newKey) {
    getData(path, oldKey).then((data) => {
        // console.log("third");
        if (data !== null) {
            console.log("Data:", data);
            setData(path, newKey, data);
            // setData(path, oldKey, null);
        } else {
            console.log("Null found for data to update");
        }
    })
}

function getChild(path, key) {
    if (!key) return child(ref(db), path);
    return child(ref(db), path + '/' + key);
}

export { setData, getData, updateKey };