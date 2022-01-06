import React, {useState, useMemo, useRef} from 'react';
import { Text, View, Image } from 'react-native';

import CharacterDisplay from '../ViewComponents/CharacterDisplay';
import AbilityDisplay from '../ViewComponents/AbilityDisplay';
import ControlCircle from '../ViewComponents/ControlCircle';

const refreshTouches = (evt, deviceWidth, left, right, setTouches) => {
    // gets left and right of screen
    // needs to get leftmost for left only
    // then needs to get touch stemming from initial left touch
    for (let i = 0; i < evt.nativeEvent.touches.length; i++) {
        const touch = evt.nativeEvent.touches[i];
        touch.pageX < deviceWidth ? left.push(touch) : right.push(touch);
    }
    setTouches({ left, right });
}

export default GameDisplay = (props) => {
    // const[animPos, setAnimPos] = useState({ x: 0, y: 0});
    const animPos = useRef({ x: 0, y: 0 });
    const [touches, setTouches] = useState({ left: [], right: [] });

    let left = []; let right = [];
    const panResponder = {
        onStartShouldSetResponder: () => true, // should respond to requests
        onMoveShouldSetResponder: () => false, // should take priority over other responders
        onResponderGrant: (evt) => {
            console.log("Game Display touch granted");
            refreshTouches(evt, props.deviceDims.deviceWidth, left, right, setTouches);
        },
        onResponderReject: (evt) => { // another view is responding and won't release it
            console.log("Game Display view priority rejected");
        },
        onResponderMove: (evt) => {
            console.log("Game Display touch moved");
            refreshTouches(evt, props.deviceDims.deviceWidth, left, right, setTouches);
        },
        onResponderRelease: (evt) => { // touch ended
            console.log("Game Display touch ended");
            setTouches({ left, right });
        },
        onResponderTerminationRequest: (evt) => true, // allow other views to become responder
        onResponderTerminate: (evt) => { // responder taken from the view
            console.log("Game Display view taken");
            setTouches({ left, right });
        },
    }

    const map = useMemo(
        () => <View style={{ transform: [{ translateX: animPos.x }, { translateY: animPos.y }] }}>
            <Image source={{ uri: props.imgData.uri }} style={props.styles.openWorldMap} ></Image>
        </View>, [props.imgData.uri, props.imgData.dims[0], props.imgData.dims[1], animPos.x, animPos.y]
    );
    const controlCircle = useMemo(
        () => <ControlCircle controlType={props.controlType} setAnimPos={setAnimPos} {...props.deviceDims}
        Character={props.Character} touches={touches.left} />, [props.controlType, props.Character.ID]
    );
    const charDisp = useMemo(
        () => <CharacterDisplay {...props.deviceDims} Character={props.Character} touches={touches.right} >
            </CharacterDisplay>, [props.Character.ID]
    );
    const abilityDisp = useMemo(
        () => <AbilityDisplay {...props.deviceDims} Character={props.Character} touches={touches.right} >
            </AbilityDisplay>, [props.Character.ID]
    );
    return (
        <View {...panResponder} >
            {/* { make this into sub component for memo-ization } */}
            {/* {memo-ize over animPos, imgData.uri, imgData.dims[0], imgData.dims[1]} */}
            {map}
            {/* <View style={{transform: [{ translateX: animPos.x }, { translateY: animPos.y }] }}>
                <Image source={{ uri: props.imgData.uri }} style={props.styles.openWorldMap} ></Image>
            </View> */}

            {/* {memo-ize over animPos, controlType, and Character} */}
            {controlCircle}
            {/* <ControlCircle controlType={props.controlType} setAnimPos={setAnimPos} {...props.deviceDims}
                Character={props.Character} /> */}

            {/* {memo-ize over Character (for now)} */}
            {charDisp}
            {abilityDisp}

            {/* <CharacterDisplay {...props.deviceDims} Character={props.Character} ></CharacterDisplay> */}
            {/* <AbilityDisplay {...props.deviceDims} Character={props.Character} ></AbilityDisplay> */}
        </View>
    )
}