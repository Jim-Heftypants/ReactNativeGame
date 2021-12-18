import React, { useState } from 'react';
import { Text, TextInput, View, Image, Dimensions } from 'react-native';

import OpenWorldMapContainer from '../ViewComponents/OpenWorldMapContainer';
import CharacterDisplay from '../ViewComponents/CharacterDisplay';
import AbilityDisplay from '../ViewComponents/AbilityDisplay';

import Characters from '../Base/Characters'

import img from '../../assets/rpg-background.jpg';

class LaunchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.deviceWidth = Dimensions.get('window').width; //full width
        this.deviceHeight = Dimensions.get('window').height; //full height
        // bandadge fix for wrong Dimensions vals on launch
        if (this.deviceHeight > this.deviceWidth) {
            const temp = this.deviceWidth;
            this.deviceWidth = this.deviceHeight;
            this.deviceHeight = temp;
        }
        this.deviceDims = {
            deviceWidth: this.deviceWidth,
            deviceHeight: this.deviceHeight,
        }
    }
    render() {
        const Character = Characters.PlayerOne;
        return(
            <View>
                <OpenWorldMapContainer {...this.deviceDims} img={img} Character={Character} ></OpenWorldMapContainer>
                <CharacterDisplay {...this.deviceDims} Character={Character} ></CharacterDisplay>
                <AbilityDisplay {...this.deviceDims} Character={Character} ></AbilityDisplay>
            </View>
        )
    }
}

export default LaunchScreen;