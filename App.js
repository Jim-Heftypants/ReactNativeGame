import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import Main from './Views/ViewController';

import * as ScreenOrientation from 'expo-screen-orientation';

import Test from './ViewComponents/Test';
// import MultiTouchTest from './ViewComponents/MultiTouchTest';

class App extends React.Component {
  componentDidMount() {
    // console.log("ScreenOrientation: " + JSON.stringify(ScreenOrientation));
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  render() {
    console.log("running application")
    return (
      <View>
        <Main></Main>
        {/* <MultiTouchTest></MultiTouchTest> */}
        {/* <Test></Test> */}
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default App;