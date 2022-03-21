import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { View, Dimensions } from 'react-native';

import Main from './Views/ViewController';
import MapTest from './Views/MapTest';

import setAppState from './Utils/appStateUtils';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: false };
  }
  componentDidMount() {
    console.log("Running Application");
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).then(() => {
      const width = Dimensions.get('window').width; //full width
      const height = Dimensions.get('window').height; //full height
      this.setState( { display: true, width, height} );
    })
    if (!this.state.display) setAppState();
  }
  render() {
    if (!this.state.display) return <></>;
    <MapTest width={this.state.width} height={this.state.height} ></MapTest>
    // return <Main width={this.state.width} height={this.state.height} ></Main>;
    // return <View style={{backgroundColor: 'red', width: '100%', height:'100%'}} ></View>
  }
}