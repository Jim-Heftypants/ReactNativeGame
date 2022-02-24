import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import Main from './Views/ViewController';
import AbilityTest from './ViewComponents/Tests/AbilityTest';
import * as ScreenOrientation from 'expo-screen-orientation';

// import backgroundImg from './assets/LandscapeAssets/splash-background.jpg';

export default class App extends React.Component {
  componentDidMount() {
    // console.log("ScreenOrientation: " + JSON.stringify(ScreenOrientation));
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  render() {
    console.log("running application");
    return (
      <View>
        {/* <AbilityTest></AbilityTest> */}
        <Main></Main>
        {/* <Image style={{ width: 1000, height: 1000 }} source={backgroundImg} ></Image> */}
        {/* <Test></Test> */}
        <StatusBar style="auto" />
      </View>
    );
  }
}