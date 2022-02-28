import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { doc, setDoc, Timestamp, getFirestore, collection, getDocs } from "firebase/firestore";

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
const db = getFirestore(app);

async function getDataList(name) {
    console.log("getDataList call");
    const Data = collection(db, name);
    const DataSnapshot = await getDocs(Data);
    const DataList = DataSnapshot.docs.map(doc => doc.data());
    return DataList;
}

// value is a plain object
async function setCollectionDocument(collectionName, documentName, value) {
    const document = doc(db, collectionName, documentName);
    return await setDoc(document, value);
}

export { getDataList, setCollectionDocument };