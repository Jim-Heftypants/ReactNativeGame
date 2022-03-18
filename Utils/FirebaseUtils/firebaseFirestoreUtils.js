import { doc, setDoc, Timestamp, getFirestore, collection, getDocs } from "firebase/firestore";
import app from '../firebaseApp';

const db = getFirestore(app);

export async function getDataList(name) {
    console.log("getDataList call");
    const Data = collection(db, name);
    const DataSnapshot = await getDocs(Data);
    const DataList = DataSnapshot.docs.map(doc => doc.data());
    return DataList;
}

// value is a plain object
export async function setCollectionDocument(collectionName, documentName, value) {
    const document = doc(db, collectionName, documentName);
    return await setDoc(document, value);
}