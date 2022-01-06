import React, {useState, useMemo, useRef} from 'react';
import { Text, View, Image, PanResponder } from 'react-native';

import CharacterDisplay from '../ViewComponents/CharacterDisplay';
import AbilityDisplay from '../ViewComponents/AbilityDisplay';
// import ControlCircle from '../ViewComponents/ControlCircle';

export default GameDisplay = (props) => {
    const mapOffset = useRef({ x: 0, y: 0 });
    const mapTouch = useRef({ initial: null, next: null, ID: null });
    const abilityTouch = useRef({ initial: null, next: null, ID: null });

    const priorTouches = useRef(0);
    const [touches, setTouches] = useState({ mapTouch, abilityTouch });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true, // should respond to requests
            onMoveShouldSetPanResponder: () => false, // should take priority over other responders
            onPanResponderGrant: (evt, gesture) => {
                console.log("Game Display touch granted");
                priorTouches.current = 1;

                if (evt.nativeEvent.pageX < (props.deviceDims.deviceWidth / 2)) {
                    mapTouch.current = { initial: evt.nativeEvent, next: null, ID: evt.nativeEvent.identifier };
                    console.log("Set mapTouch initial");
                    return;
                }
                abilityTouch.current = { initial: evt.nativeEvent, next: null, ID: evt.nativeEvent.identifier };
                console.log("Set abilityTouch initial");
                setTouches({mapTouch, abilityTouch});
            },
            onPanResponderReject: (evt, gesture) => { // another view is responding and won't release it
                console.log("Game Display view priority rejected");
            },
            onPanResponderMove: (evt, gesture) => { // CURRENTLY ASSUMING 2 OR LESS TOUCHES
                // console.log("Game Display touch moved");
                const lastTouchCount = priorTouches.current;
                priorTouches.current = gesture.numberActiveTouches;
                if (gesture.numberActiveTouches > lastTouchCount) {
                    addTouch(evt, touches, setTouches, props.deviceDims.deviceWidth);
                }
                if (gesture.numberActiveTouches < lastTouchCount) {
                    removeTouch(evt, gesture, touches, setTouches);
                }
                moveTouches(evt, gesture, touches, setTouches, mapOffset, props.Character, props.deviceDims);
            },
            onPanResponderRelease: (evt, gesture) => { // touch ended
                console.log("Game Display touch ended");
                mapTouch.current = { initial: null, next: null, ID: null };
                abilityTouch.current = { initial: null, next: null, ID: null };
                setTouches({ mapTouch, abilityTouch });
            },
            onPanResponderTerminationRequest: (evt) => true, // allow other views to become responder
            onPanResponderTerminate: (evt, gesture) => { // responder taken from the view
                console.log("Game Display view taken");
                mapTouch.current = { initial: null, next: null, ID: null };
                abilityTouch.current = { initial: null, next: null, ID: null };
                setTouches({ mapTouch, abilityTouch });
            },
        })
    ).current;

    const map = useMemo(
        () => <View style={{ transform: [{ translateX: mapOffset.current.x }, { translateY: mapOffset.current.y }] }}>
            <Image source={{ uri: props.imgData.uri }} style={props.styles.openWorldMap} ></Image>
        </View>, [mapOffset.current.x, mapOffset.current.y, props.imgData.uri, props.imgData.dims[0], props.imgData.dims[1]]
    );
    const charDisp = useMemo(
        () => <CharacterDisplay {...props.deviceDims} Character={props.Character} touches={touches} >
            </CharacterDisplay>, [props.Character.ID]
    );
    const abilityDisp = useMemo(
        () => <AbilityDisplay {...props.deviceDims} Character={props.Character} touches={touches} >
            </AbilityDisplay>, [props.Character.ID]
    );
    return (
        <View {...panResponder.panHandlers} >
            {map}
            {/* <View style={{transform: [{ translateX: mapOffset.x }, { translateY: mapOffset.y }] }}>
                <Image source={{ uri: props.imgData.uri }} style={props.styles.openWorldMap} ></Image>
            </View> */}

            {/* {just the visual display -- no functionality} */}
            {/* {pointless to have its own class and memo -- just define here with type prop} */}
            {/* {controlCircle} */}

            {/* {memo-izing over Character ID for now} */}
            {charDisp}
            {abilityDisp}

            {/* <CharacterDisplay {...props.deviceDims} Character={props.Character} ></CharacterDisplay> */}
            {/* <AbilityDisplay {...props.deviceDims} Character={props.Character} ></AbilityDisplay> */}
        </View>
    )
}

const addTouch = (evt, touches, setTouches, deviceWidth) => {
    // first touch already exists
    const newTouch = evt.nativeEvent.touches[evt.nativeEvent.touches.length - 1];
    if (newTouch.pageX < (deviceWidth / 2)) { // left side
        if (!touches.mapTouch.current.ID) { // set new map touch state
            touches.mapTouch.current = { initial: newTouch, next: null, ID: newTouch.identifier };
            console.log("Set mapTouch initial");
        }
        return;
    }
    // right side
    if (/* in ability circle dims */!touches.abilityTouch.current.initial) {
        touches.abilityTouch.current = { initial: newTouch, next: null, ID: newTouch.identifier };
        console.log("Set abilityTouch initial");
        setTouches({ mapTouch: touches.mapTouch, abilityTouch: touches.abilityTouch }) // button press needs re-render
        return;
    }
}

const removeTouch = (evt, gesture, touches, setTouches) => {
    if (gesture.numberActiveTouches === 0) return;
    if (evt.nativeEvent.identifier === touches.mapTouch.current.ID) {
        touches.abilityTouch.current = { initial: null, next: null, ID: null };
        console.log("Removed abilityTouch");
    }
    if (evt.nativeEvent.identifier === touches.abilityTouch.current.ID) {
        touches.mapTouch.current = { initial: null, next: null, ID: null };
        console.log("Removed mapTouch");
    }
    setTouches({ mapTouch: touches.mapTouch, abilityTouch: touches.abilityTouch });
    return;
}

const moveTouches = (evt, gesture, touches, setTouches, mapOffset, Character, deviceDims) => {
    for (let i = 0; i < gesture.numberActiveTouches; i++) {
        if (evt.nativeEvent.touches[i].identifier === touches.mapTouch.current.ID) {
            touches.mapTouch.current = { ...touches.mapTouch.current, next: evt.nativeEvent.touches[i] };
            mapFunc(touches.mapTouch.current.initial, touches.mapTouch.current.next, mapOffset, Character, deviceDims);
            continue;
        }
        else if (evt.nativeEvent.touches[i].identifier === touches.abilityTouch.current.ID) {
            touches.abilityTouch.current = { ...touches.abilityTouch.current, next: evt.nativeEvent.touches[i] };
            // touchFunc
            continue;
        }
        // void touch
    }
    setTouches({ mapTouch: touches.mapTouch, abilityTouch: touches.abilityTouch });
}

const mapFunc = (initialTouch, currentTouch, mapOffset, Character, dims) => {
    const dx = initialTouch.pageX - currentTouch.pageX;
    const dy = initialTouch.pageY - currentTouch.pageY;
    
    const posTotal = Math.abs(dx) + Math.abs(dy);
    if (posTotal < 10) {
        // console.log("returning early");
        return;
    }
    // console.log("touches: "); console.log(initialTouch); console.log(currentTouch);
    // console.log("initialOffset: "); console.log(mapOffset.current);
    const horizontalPercent = dx / posTotal; const verticalPercent = dy / posTotal; // posTotal > 10
    // console.log("hPercent: " + horizontalPercent + "  vPercent: " + verticalPercent);
    const posMod = Character.DynamicData.movementSpeed / (dims.characterSize / dims.displayScale);
    // console.log("posMod: " + posMod);
    let tempX = mapOffset.current.x; let tempY = mapOffset.current.y;
    tempX += (horizontalPercent * posMod);
    tempY += (verticalPercent * posMod);
    if (tempX > 0) tempX = 0;
    if (tempX < -dims.widthMax) tempX = -dims.widthMax;
    if (tempY > 0) tempY = 0;
    if (tempY < -dims.heightMax) tempY = -dims.heightMax;
    // console.log("tempX: " + tempX + " tempY: " + tempY);
    mapOffset.current = { x: tempX, y: tempY };

    Character.DynamicData.currentPosition = [tempX, tempY];
    // sets location in database

    // console.log("post offset: "); console.log(mapOffset.current);
}