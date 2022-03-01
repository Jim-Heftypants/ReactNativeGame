import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

import Main from './Views/ViewController';

import setAppState from '../Utils/appStateUtils';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: false };
  }
  componentDidMount() {
    // console.log("ScreenOrientation: " + JSON.stringify(ScreenOrientation));
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    if (!this.state.display) setAppState();
    this.setState( { display: true } );
  }
  render() {
    console.log("Running Application");
    if (!this.state.display) return <></>;
    return <Main></Main>;
    // return <View style={{backgroundColor: 'red', width: '100%', height:'100%'}} ></View>
  }
}