import React, {useState, useMemo, useRef} from 'react';
import { Text, View, Image, PanResponder } from 'react-native';

import CharacterDisplay from '../ViewComponents/CharacterDisplay';
import AbilityDisplay from '../ViewComponents/AbilityDisplay';
// import ControlCircle from '../ViewComponents/ControlCircle';

export default GameDisplay = (props) => {
    const mapOffset = useRef({ x: 0, y: 0 });
    const mapTouch = useRef({ initial: null, next: null, ID: null });
    const abilityTouch = useRef({ initial: null, next: null, ID: null });
    const mapTimer = useRef();

    const priorTouchList = useRef();
    const priorTouches = useRef(0);
    const [touches, setTouches] = useState({ mapTouch, abilityTouch });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true, // should respond to requests
            onMoveShouldSetPanResponder: () => false, // should take priority over other responders
            // onPanResponderGrant: (evt, gesture) => {
            //     console.log("Game Display touch granted");
            // },
            onPanResponderReject: (evt, gesture) => { // another view is responding and won't release it
                console.log("Game Display view priority rejected");
            },
            onPanResponderMove: (evt, gesture) => { // CURRENTLY ASSUMING 2 OR LESS TOUCHES
                // console.log("Game Display touch moved");
                const lastTouchCount = priorTouches.current;
                priorTouches.current = gesture.numberActiveTouches;
                if (gesture.numberActiveTouches > lastTouchCount) {
                    console.log("New touch started");
                    priorTouchList.current = evt.nativeEvent.touches;
                    const newTouch = evt.nativeEvent.touches[evt.nativeEvent.touches.length - 1];
                    if (newTouch.pageX < (props.deviceDims.deviceWidth / 2)) { // left side
                        addMapTouch(newTouch, touches, setTouches, mapTimer, mapOffset, props.deviceDims, props.Character);
                        return;
                    }
                    addAbilityTouch(newTouch, touches, setTouches);
                    return;
                }
                if (gesture.numberActiveTouches < lastTouchCount) {
                    const removedTouchID = getRemovedTouch(evt.nativeEvent.touches, priorTouchList.current);
                    console.log("Removing touch: " + removedTouchID);
                    removeTouch(removedTouchID, touches, setTouches, mapTimer, mapOffset, props.Character);
                    priorTouchList.current = evt.nativeEvent.touches;
                    return;
                }
                moveTouches(evt, gesture, touches, setTouches, mapOffset, props.deviceDims);
            },
            onPanResponderRelease: (evt, gesture) => { // touch ended
                // console.log("Game Display touch ended");
                console.log("Removing touch: " + evt.nativeEvent.identifier);
                priorTouches.current = 0;
                removeTouch(evt.nativeEvent.identifier, touches, setTouches, mapTimer, mapOffset, props.Character);

                // mapTouch.current = { initial: null, next: null, ID: null };
                // abilityTouch.current = { initial: null, next: null, ID: null };
                // setTouches({ mapTouch, abilityTouch });
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
        () => <CharacterDisplay {...props.deviceDims} Character={props.Character} touches={touches.abilityTouch} >
            </CharacterDisplay>, [props.Character.ID]
    );
    const abilityDisp = useMemo(
        () => <AbilityDisplay {...props.deviceDims} Character={props.Character} touches={touches.abilityTouch} >
            </AbilityDisplay>, [props.Character.ID, touches.abilityTouch.current.ID] // re-renders on new touch not touch change
    );
    return (
        <View {...panResponder.panHandlers} style={{width: props.deviceDims.deviceWidth, height: props.deviceDims.deviceHeight, zIndex: 100}} >
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

const addMapTouch = (newTouch, touches, setTouches, mapTimer, mapOffset, deviceDims, Character) => {
    if (touches.mapTouch.current.ID) {
        console.log("Map touch couldn't be added -- one already exists");
        return;
    }
    touches.mapTouch.current = { initial: newTouch, next: null, ID: newTouch.identifier };
    console.log("Set mapTouch initial");
    // start timer -- timer must check if next exists
    mapTimer.current = setInterval(() => {
        if (touches.mapTouch.current.next) {
            mapFunc(touches.mapTouch.current.initial, touches.mapTouch.current.next, mapOffset, deviceDims, Character);
            setTouches({ mapTouch: touches.mapTouch, abilityTouch: touches.abilityTouch });
        }
    }, 20);
}

const addAbilityTouch = (newTouch, touches, setTouches) => {
    if (touches.abilityTouch.current.initial) {
        console.log("Ability touch couldn't be added -- one already exists");
        return;
    }
    touches.abilityTouch.current = { initial: newTouch, next: null, ID: newTouch.identifier };
    console.log("Set abilityTouch initial");
    setTouches({ mapTouch: touches.mapTouch, abilityTouch: touches.abilityTouch }); // button press needs re-render
}

const addTouch = (newTouch, touches, setTouches, deviceWidth, mapTimer, mapOffset, deviceDims, Character) => {
    if (newTouch.pageX < (deviceWidth / 2)) { // left side
        addMapTouch(touches, setTouches, mapTimer, mapOffset, deviceDims, Character);
        return;
    }
    // right side
    addAbilityTouch(touches, setTouches);
}

const getRemovedTouch = (currentTouches, lastTouches) => {
    // console.log("current touches: "); console.log(currentTouches);
    // console.log("lastTouches: "); console.log(lastTouches);
    let total = 0;
    for (let i = 0; i < lastTouches.length; i++) {
        total += lastTouches[i].identifier;
        if (i < currentTouches.length) total -= currentTouches[i].identifier;
    }
    return total;
}

const removeTouch = (lastTouchID, touches, setTouches, mapTimer, mapOffset, Character) => {
    // if (gesture.numberActiveTouches === 0) {
    //     console.log("returning early from remove touch");
    //     return;
    // }
    if (lastTouchID === touches.mapTouch.current.ID) {
        touches.mapTouch.current = { initial: null, next: null, ID: null };
        console.log("Removed mapTouch");
        // clear timer
        clearInterval(mapTimer.current);
        // update database (maybe needs to be on each change ?)
        Character.DynamicData.currentPosition = [mapOffset.current.x, mapOffset.current.y];
    }
    if (lastTouchID === touches.abilityTouch.current.ID) {
        touches.abilityTouch.current = { initial: null, next: null, ID: null };
        console.log("Removed abilityTouch");
    }
    setTouches({ mapTouch: touches.mapTouch, abilityTouch: touches.abilityTouch });
}

const moveTouches = (evt, gesture, touches, setTouches) => {
    for (let i = 0; i < gesture.numberActiveTouches; i++) {
        if (evt.nativeEvent.touches[i].identifier === touches.mapTouch.current.ID) {
            touches.mapTouch.current = { ...touches.mapTouch.current, next: evt.nativeEvent.touches[i] };
            continue;
        }
        else if (evt.nativeEvent.touches[i].identifier === touches.abilityTouch.current.ID) {
            touches.abilityTouch.current = { ...touches.abilityTouch.current, next: evt.nativeEvent.touches[i] };
            // touchFunc
            setTouches({ mapTouch: touches.mapTouch, abilityTouch: touches.abilityTouch });
            continue;
        }
        // void touch
    }
}

const mapFunc = (initialTouch, currentTouch, mapOffset, dims, Character) => {
    // NEED TO CONTINUE MOVING AND JUST UPDATE CURRENT POSITION -- NOT MOVE ON POSITION CHANGE
    const dx = initialTouch.pageX - currentTouch.pageX;
    const dy = initialTouch.pageY - currentTouch.pageY;
    
    const posTotal = Math.abs(dx) + Math.abs(dy);
    if (posTotal < 8) {
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

    // Character.DynamicData.currentPosition = [tempX, tempY]; // seems slow to be here -- set on touch end ?
    // sets location in database
}