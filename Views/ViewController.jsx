import React from 'react';
import { Text, TextInput, View, Image, Dimensions } from 'react-native';
import Settings from './Settings';
import SplashPage from './SplashPage';
import GameDisplayContainer from './GameDisplayContainer';

import splashImg from '../assets/LandscapeAssets/splash-background.jpg';
import backgroundImg from '../assets/LandscapeAssets/rpg-background.jpg';

const characterSize = 100;

class ViewController extends React.Component {
    constructor(props) {
        super(props);
        // props that could be changed from settings page
        this.state = {
            page: 1,
            data: {
                displayScale: 1,
                characterID: 1,
                controlType: 'transparent',
            }
        };
        this.deviceWidth = Dimensions.get('window').width; //full width
        this.deviceHeight = Dimensions.get('window').height; //full height
        // bandadge fix for wrong Dimensions vals on launch
        if (this.deviceHeight > this.deviceWidth) {
            const temp = this.deviceWidth;
            this.deviceWidth = this.deviceHeight;
            this.deviceHeight = temp;
        }
    }
    render() {
        const mapSizeByCharacterSize = 20; // num characters left to right to equal map size
        const mapScale = characterSize * mapSizeByCharacterSize;
        this.deviceDims = {
            deviceWidth: this.deviceWidth,
            deviceHeight: this.deviceHeight,
            displayScale: this.state.data.displayScale,
            mapScale,
            characterSize,
        }
        let disp;
        switch(this.state.page) {
            case -1:
                disp = <SplashPage that={this} img={splashImg} deviceDims={this.deviceDims} ></SplashPage>
                console.log("Opening splash page");
                break;
            case 0:
                disp = <Settings that={this} deviceDims={this.deviceDims} ></Settings>;
                console.log("Opening settings page");
                break;
            case 1:
                disp = <GameDisplayContainer that={this} img={backgroundImg}
                        data={this.state.data} deviceDims={this.deviceDims} ></GameDisplayContainer>;
                console.log("Opening game display");
                break;
            default:
                disp = <View></View>;
        }
        return (
            <View>
                {disp}
            </View>
        )
    }
}

export default ViewController;