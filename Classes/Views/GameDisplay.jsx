import React from 'react';
import { Text, TextInput, View, Image } from 'react-native';

import OpenWorldMapContainer from '../ViewComponents/OpenWorldMapContainer';
import CharacterDisplay from '../ViewComponents/CharacterDisplay';
import AbilityDisplay from '../ViewComponents/AbilityDisplay';

import Characters from '../Base/Characters'

class GameDisplay extends React.Component {
    render() {
        // console.log("data: " + JSON.stringify(this.props.data));
        const Character = Characters[this.props.data.characterID];
        // console.log("Character: " + JSON.stringify(Character));
        // console.log("deviceDims: " + JSON.stringify(this.props.deviceDims));
        return(
            <View style={{ width: this.props.deviceDims.deviceWidth, height: this.props.deviceDims.deviceHeight }} >
                <OpenWorldMapContainer {...this.props.deviceDims} img={this.props.img} Character={Character} ></OpenWorldMapContainer>
                <CharacterDisplay {...this.props.deviceDims} Character={Character} ></CharacterDisplay>
                <AbilityDisplay {...this.props.deviceDims} Character={Character} ></AbilityDisplay>
            </View>
        )
    }
}

export default GameDisplay;