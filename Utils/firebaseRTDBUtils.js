import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set, child, get, once } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAxckbUXp7vOMKEh7LSfbFU_Q4fhRcr4QI",
  authDomain: "reactnativegame-8a795.firebaseapp.com",
  databaseURL: "https://reactnativegame-8a795-default-rtdb.firebaseio.com",
  projectId: "reactnativegame-8a795",
  storageBucket: "reactnativegame-8a795.appspot.com",
  messagingSenderId: "119512401049",
  appId: "1:119512401049:web:94d4602194bff0e9772408",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "React Native Game");
const db = getDatabase(app);

async function setData(path, key, data) {
    const reference = ref(db, `${path}/${key}`);
    await set(reference, data);
}

async function getData(path, key) {
    const referencePath = getChild(path, key);
    console.log(referencePath);
    get(referencePath).then((snapshot) => {
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

async function updateKey(path, oldKey, newKey) {
    getData(path, oldKey).then((data) => {
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
    return child(ref(db), path + '/' + key);
}

export { setData, getData, updateKey };