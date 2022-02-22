import React from 'react';
import { Text, TextInput, View, Image, Dimensions, AppState } from 'react-native';

import Settings from './Settings';
import SplashPage from './SplashPage';
import GameDisplayContainer from './GameDisplayContainer';
import LoadingScreen from './LoadingScreen';
import { getJSONData } from '../Utils/storageUtils';

import splashImg from '../assets/LandscapeAssets/splash-background.jpg';
import backgroundImg from '../assets/LandscapeAssets/rpg-background.jpg';

const characterSize = 100;

class ViewController extends React.Component {
    constructor(props) {
        super(props);
        // props that could be changed from settings page
        this.state = {
            dataFetched: false,
            page: 1,
            data: {
                displayScale: 2,
                characterID: 1,
                controlType: 'transparent',
            },
        };
        this.appState = AppState.currentState;
        this.deviceWidth = Dimensions.get('window').width; //full width
        this.deviceHeight = Dimensions.get('window').height; //full height
        // bandadge fix for wrong Dimensions vals on launch
        if (this.deviceHeight > this.deviceWidth) {
            const temp = this.deviceWidth;
            this.deviceWidth = this.deviceHeight;
            this.deviceHeight = temp;
        }
        // console.log(backgroundImg);
    }

    componentDidMount() {
        this.appStateSubscription = AppState.addEventListener("change",
            nextAppState => {
                if (this.appState.match(/inactive|background/) && nextAppState === "active") {
                    console.log("App has come to the foreground!");
                }
                if (this.appState === "active" && nextAppState.match(/inactive|background/)) {
                    console.log("App has been sent to the background!");

                }
                this.appState = nextAppState;
            }
        );
        this.getAccountData();
    }
    getAccountData() {
        const that = this;
        getJSONData(that.state.data.characterID).then(data => {
            if (data) { // data exists in database
                console.log("Local data found!");
                that.setState({
                    dataFetched: true,
                    page: 1,
                    data: {
                        displayScale: 2,
                        characterID: 1,
                        controlType: 'transparent',
                    },
                });
            } else {
                console.log("No local data found!");
                that.setState({
                    dataFetched: true,
                    page: -1,
                    data: {
                        displayScale: 2,
                        characterID: 0,
                        controlType: 'transparent',
                    },
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.appStateSubscription) this.appStateSubscription.remove();
    }

    render() {
        const { dataFetched } = this.state;
        if (!dataFetched) {
            return <LoadingScreen deviceWidth={this.deviceWidth} deviceHeight={this.deviceHeight} ></LoadingScreen>
        }
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
        switch (this.state.page) {
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