import React from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import Main from './Views/ViewController';

import { getDataList, setCollectionDocument } from './Utils/firebaseFirestoreUtils';
import { getData, setData, updateKey } from './Utils/firebaseRTDBUtils';

const collectionName = "Users";

const documentValue = {
  name: 'Jim Zimbabawe',
  level: 9001,
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: false };

    // setData(collectionName, "User", documentValue);
    (async () => {
      await updateKey(collectionName, "User", "user");
      console.log(2);
    })();
    console.log(1);
    // updateKey(collectionName, "User", "user").then(() => {
    //   console.log("Key update successful!");
    //   getData(collectionName, "user");
    // })

    // setCollectionDocument(collectionName, "Test", documentValue).then(() => {
    //   console.log("Successfully set document data!");
    //   getDataList(collectionName).then((data) => { console.log(data) });
    // }).catch((err) => { console.log(err) });
  }
  componentDidMount() {
    // console.log("ScreenOrientation: " + JSON.stringify(ScreenOrientation));
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    this.setState( { display: true } );
  }
  render() {
    // console.log("running application");
    if (!this.state.display) return <></>;
    return <View style={{backgroundColor: 'red', width: '100%', height:'100%'}} ></View>
    // return <Main></Main>;
  }
}