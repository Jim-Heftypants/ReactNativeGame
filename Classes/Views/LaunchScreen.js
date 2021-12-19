import React from 'react';
import { Text, TextInput, View, Image, Dimensions } from 'react-native';

import OpenWorldMapContainer from '../ViewComponents/OpenWorldMapContainer';
import CharacterDisplay from '../ViewComponents/CharacterDisplay';
import AbilityDisplay from '../ViewComponents/AbilityDisplay';

import Characters from '../Base/Characters'

import img from '../../assets/rpg-background.jpg';

const displayScale = 1;

class LaunchScreen extends React.Component {
    constructor(props) {
        super(props);
        let deviceWidth = Dimensions.get('window').width; //full width
        let deviceHeight = Dimensions.get('window').height; //full height
        // bandadge fix for wrong Dimensions vals on launch
        if (deviceHeight > deviceWidth) {
            const temp = deviceWidth;
            deviceWidth = deviceHeight;
            deviceHeight = temp;
        }
        this.deviceDims = {
            deviceWidth,
            deviceHeight,
            displayScale,
        }
    }
    render() {
        const Character = Characters.PlayerOne;
        return(
            <View style={{ width: this.deviceDims.deviceWidth, height: this.deviceDims.deviceHeight }} >
                <OpenWorldMapContainer {...this.deviceDims} img={img} Character={Character} ></OpenWorldMapContainer>
                <CharacterDisplay {...this.deviceDims} Character={Character} ></CharacterDisplay>
                <AbilityDisplay {...this.deviceDims} Character={Character} ></AbilityDisplay>
            </View>
        )
    }
}

export default LaunchScreen;