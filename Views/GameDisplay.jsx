import React, {useState} from 'react';
import { Text, View, Image } from 'react-native';

import CharacterDisplay from '../ViewComponents/CharacterDisplay';
import AbilityDisplay from '../ViewComponents/AbilityDisplay';
import ControlCircle from '../ViewComponents/ControlCircle';

export default GameDisplay = (props) => {
    const[animPos, setAnimPos] = useState({ x: 0, y: 0});
    const panResponder = {
        onStartShouldSetResponder: () => true, // should respond to requests
        onMoveShouldSetResponder: () => false, // should take priority over other responders
        onResponderGrant: (evt) => {
            console.log("Game Display touch granted");
        },
        onResponderReject: (evt) => { // another view is responding and won't release it
            console.log("Game Display view priority rejected");
        },
        onResponderMove: (evt) => {
            console.log("Game Display touch moved");
        },
        onResponderRelease: (evt) => { // touch ended
            console.log("Game Display touch ended");
        },
        onResponderTerminationRequest: (evt) => true, // allow other views to become responder
        onResponderTerminate: (evt) => { // responder taken from the view
            console.log("Game Display view taken");
        },
    }
    return (
        <View {...panResponder} >
            {/* somehow this needs to be a sub component with setAnimPos or re-render everything each frame */}
            <View style={{transform: [{ translateX: animPos.x }, { translateY: animPos.y }] }}>
                <Image source={{ uri: props.imgData.uri }} style={props.styles.openWorldMap} ></Image>
            </View>
            <ControlCircle controlType={'transparent'} setAnimPos={setAnimPos} {...props.deviceDims} Character={props.Character} />

            <CharacterDisplay {...props.deviceDims} Character={props.Character} ></CharacterDisplay>
            <AbilityDisplay {...props.deviceDims} Character={props.Character} ></AbilityDisplay>
        </View>
    )
}