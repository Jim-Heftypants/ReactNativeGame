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
  }
  componentDidMount() {
    // console.log("ScreenOrientation: " + JSON.stringify(ScreenOrientation));
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    this.setState( { display: true } );
  }
  render() {
    console.log("Running Application");
    if (!this.state.display) return <></>;
    return <Main></Main>;
    // return <View style={{backgroundColor: 'red', width: '100%', height:'100%'}} ></View>
  }
}