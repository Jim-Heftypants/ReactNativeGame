import React from 'react';
import { Text, TextInput, View, Image, Dimensions, AppState } from 'react-native';

import Settings from './Settings';
import SplashPage from './SplashPage';
import GameDisplayContainer from './GameDisplayContainer';
import LoadingScreen from './LoadingScreen';

import { getLocalData } from '../Utils/storageUtils';

import splashImg from '../assets/LandscapeAssets/splash-background.jpg';
import backgroundImg from '../assets/LandscapeAssets/rpg-background.jpg';
import getDisplayScale from '../Utils/getDisplayScale';

const characterSize = 100;
const mapSizeByCharacterSize = 20; // num characters left to right to equal map size
const mapScale = characterSize * mapSizeByCharacterSize;

class ViewController extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataFetched: false };
        [this.deviceWidth, this.deviceHeight] = getDeviceDims();
        this.pages = {};
    }
    
    componentDidMount() {
        getLocalData('User').then((data) => {
            if (!data) {
                console.log("No local user data found");
                this.setState({ dataFetched: true });
                return;
            }
            this.setState({ dataFetched: true });
        })
    }

    render() {
        const { dataFetched } = this.state;
        if (!dataFetched) {
            return <LoadingScreen deviceWidth={this.deviceWidth} deviceHeight={this.deviceHeight} ></LoadingScreen>
        }
        this.deviceDims = {
            deviceWidth: this.deviceWidth,
            deviceHeight: this.deviceHeight,
            displayScale: this.state.data.displayScale,
            mapScale,
            characterSize,
        }
        let disp;
        switch (this.state.page) {
            case "Splash Page":
                disp = <SplashPage that={this} img={splashImg} deviceDims={this.deviceDims} ></SplashPage>
                console.log("Opening splash page");
                break;
            case "Settings":
                disp = <Settings that={this} deviceDims={this.deviceDims} ></Settings>;
                console.log("Opening settings page");
                break;
            case "Gameplay":
                disp = <GameDisplayContainer that={this} img={backgroundImg}
                    data={this.state.data} deviceDims={this.deviceDims} ></GameDisplayContainer>;
                console.log("Opening game display");
                break;
            default:
                disp = <View></View>;
        }
        return (
            <>
                {disp}
            </>
        )
    }
}

export default ViewController;

const getDeviceDims = () => {
    const deviceWidth = Dimensions.get('window').width; //full width
    const deviceHeight = Dimensions.get('window').height; //full height
    // bandadge fix for wrong Dimensions vals on launch
    if (deviceHeight > deviceWidth) {
        const temp = deviceWidth;
        deviceWidth = deviceHeight;
        deviceHeight = temp;
    }
    return [deviceWidth, deviceHeight];
}
