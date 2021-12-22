import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import imageStyles from './Style-Sheets/images';
import TextDisplay from './Classes/ViewComponents/TextDisplay';
import textStyles from './Style-Sheets/text';
import LaunchScreen from './Classes/Views/LaunchScreen';

// doesn't work :)
import Orientation from 'react-native-orientation';
import * as ScreenOrientation from 'expo-screen-orientation';

import Test from './Classes/ViewComponents/Test';



class App extends React.Component {
  componentDidMount() {
    // console.log("ScreenOrientation: " + JSON.stringify(ScreenOrientation));
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  render() {
    console.log("running application")
    return (
      <View>
        {/* <Image style={imageStyles.default} source={require('./assets/rpg-background.jpg')} /> */}
        {/* <TextDisplay style={textStyles.default}></TextDisplay> */}

        <LaunchScreen ></LaunchScreen>

        {/* <Test></Test> */}

        <StatusBar style="auto" />
      </View>
    );
  }
}

export default App;