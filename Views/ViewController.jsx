import React, { useState, useEffect } from 'react';
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

import { loginWithLocalData } from '../databaseUtils/userAuth';

const characterSize = 100;
const mapSizeByCharacterSize = 20; // num characters left to right to equal map size
const mapScale = characterSize * mapSizeByCharacterSize;

const pages = [
    'Splash Page',
    'Character Creation',
    'Character Selection',
    'Settings',
    'Game Display'
];

const ViewController = (props) => {
    const [state, setState] = useState({
        dataFetched: false,
        userID: null,
        username: null,
        characterList: [],
        characterName: null,
        settings: { displayScale: getDisplayScale(props.width, props.height, mapScale) },
        // page: "Loading Screen",
        page: "Character Creation",
    });
    const deviceDims = {
        width: props.width,
        height: props.height,
    }

    useEffect(() => {
        if (!state.userID) {
            loginWithLocalData().then((user) => {
                let page = "Character Selection";
                if (!user) {
                    console.log("No local user data found");
                    page = "Splash Page";
                    setState({ ...state, page });
                } else {
                    console.log("Local user data found!");
                    page = "Character Creation";
                    setState({ ...state, page, userID: user.uid, username: user.displayName });
                }
            })
        }
    }, []);

    // console.log("Username:", state.username);
    console.log("Page:", state.page);
    const mapScales = {
        displayScale: state.settings.displayScale,
        mapScale,
        characterSize,
    }
    const basicExports = {
        parentState: state,
        setParentState: setState,
        deviceDims,
    }
    let disp;
    switch (state.page) {
        case "Splash Page":
            disp = <SplashPage {...basicExports} img={splashImg} ></SplashPage>
            break;
        case "Loading Screen":
            disp = <LoadingScreen {...deviceDims} ></LoadingScreen>
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
            disp = <ViewSelectionScreen {...basicExports} pages={pages} ></ViewSelectionScreen>
    }
    return (
        <>
            {disp}
        </>
    )
}

export default ViewController;