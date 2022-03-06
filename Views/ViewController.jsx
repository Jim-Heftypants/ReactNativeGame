import React from 'react';
import { Text, TextInput, View, Image } from 'react-native';

import Settings from './Settings';
import SplashPage from './SplashPage';
import GameDisplayContainer from './GameDisplayContainer';
import LoadingScreen from './LoadingScreen';
import ViewSelectionScreen from './ViewSelectionScreen';
import CharacterCreationScreen from './CharacterCreationScreen';
import CharacterSelectionScreen from './CharacterSelectionScreen';

import splashImg from '../assets/LandscapeAssets/splash-background.jpg';
import backgroundImg from '../assets/LandscapeAssets/rpg-background.jpg';
import getDisplayScale from '../Utils/getDisplayScale';

import { loginWithLocalData } from '../Utils/userAuth';

const characterSize = 100;
const mapSizeByCharacterSize = 20; // num characters left to right to equal map size
const mapScale = characterSize * mapSizeByCharacterSize;

/* Pages
Splash Page
Character Selection
Character Creation
Settings
Game Display
*/

class ViewController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFetched: false,
            userID: null,
            username: null,
            characterList: [],
            characterName: null,
            settings: {},
            page: "Splash Page",
        };
        this.deviceDims = {
            width: props.width,
            height: props.height,
        }
        this.pages = [
            'Splash Page',
            'Character Creation',
            'Character Selection',
            'Settings',
            'Game Display'
        ];
    }

    componentDidMount() {
        loginWithLocalData().then((data) => {
            let page = "Character Selection";
            if (!data) {
                console.log("No local user data found");
                page = "Splash Page";
            } else {
                console.log("Local user data found!");
            }
            this.setState({ ...this.state, page });
        })
    }

    render() {
        const mapScales = {
            displayScale: this.state.settings?.displayScale || getDisplayScale(...this.deviceDims, mapScale),
            mapScale,
            characterSize,
        }
        const basicExports = {
            parentState: this.state,
            setParentState: this.setState,
            deviceDims: this.deviceDims,
        }
        let disp;
        switch (this.state.page) {
            case "Splash Page":
                disp = <SplashPage {...basicExports} img={splashImg} ></SplashPage>
                break;
            case "Loading Screen":
                disp = <LoadingScreen {...this.deviceDims} ></LoadingScreen>
                break;
            case "Character Creation":
                disp = <CharacterCreationScreen {...basicExports} ></CharacterCreationScreen>
                break;
            case "Character Selection":
                disp = <CharacterSelectionScreen {...basicExports} ></CharacterSelectionScreen>
                break;
            case "Settings":
                disp = <Settings {...basicExports} mapScales={mapScales} ></Settings>;
                console.log("Opening settings page");
                break;
            case "Game Display":
                disp = <GameDisplayContainer {...basicExports} img={backgroundImg} mapScales={mapScales} ></GameDisplayContainer>;
                console.log("Opening game display");
                break;
            default:
                console.log("View Controller called non-existant view");
                disp = <ViewSelectionScreen {...basicExports} pages={this.pages} ></ViewSelectionScreen>
        }
        return (
            <>
                {disp}
            </>
        )
    }
}

export default ViewController;