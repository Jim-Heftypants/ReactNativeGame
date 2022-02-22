import React, { useState, useMemo, useRef } from 'react';
import { Text, View, Image, PanResponder } from 'react-native';

import MapContainer from '../ViewComponents/MapContainer';
import AbilityButtonContainer from '../ViewComponents/AbilityButtonContainer';
import CharacterDisplay from '../ViewComponents/CharacterDisplay';
import EffectsContainer from '../ViewComponents/EffectsContainer';

export default GameDisplay = (props) => {
    const mapTouch = useRef({ initial: null, next: null, ID: null });
    const abilityTouch = useRef({ initial: null, next: null, ID: null });

    const priorTouchList = useRef();
    const priorTouches = useRef(0);
    const [touches, setTouches] = useState({ mapTouch, abilityTouch });
    const [effect, addEffect] = useState({});

    const onTouchMove = (evt, gesture) => {
        // console.log("Game Display touch moved");
        const lastTouchCount = priorTouches.current;
        priorTouches.current = gesture.numberActiveTouches;
        if (gesture.numberActiveTouches > lastTouchCount) {
            // console.log("New touch started");
            priorTouchList.current = evt.nativeEvent.touches;
            const newTouch = evt.nativeEvent.touches[evt.nativeEvent.touches.length - 1];
            let touchType = "abilityTouch";
            if (newTouch.pageX < (props.deviceDims.deviceWidth / 2)) touchType = "mapTouch";
            addTouch(newTouch, touches, setTouches, touchType);
            return;
        }
        if (gesture.numberActiveTouches < lastTouchCount) {
            const removedTouchID = getRemovedTouch(evt.nativeEvent.touches, priorTouchList.current);
            // console.log("Removing touch: " + removedTouchID);
            removeTouch(removedTouchID, touches, setTouches);
            priorTouchList.current = evt.nativeEvent.touches;
            return;
        }
        moveTouches(evt, gesture, touches, setTouches);
    }
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true, // should respond to requests
            onMoveShouldSetPanResponder: () => false, // should take priority over other responders
            onPanResponderGrant: (evt, gesture) => {
                // console.log("Game Display touch granted");
                onTouchMove(evt, gesture);
            },
            onPanResponderReject: (evt, gesture) => { // another view is responding and won't release it
                // console.log("Game Display view priority rejected");
            },
            onPanResponderMove: (evt, gesture) => {
                onTouchMove(evt, gesture);
            },
            onPanResponderRelease: (evt, gesture) => {
                // console.log("Removing touch: " + evt.nativeEvent.identifier);
                priorTouches.current = 0;
                removeTouch(evt.nativeEvent.identifier, touches, setTouches);
            },
            onPanResponderTerminationRequest: (evt) => true, // allow other views to become responder
            onPanResponderTerminate: (evt, gesture) => { // responder taken from the view
                // console.log("Game Display view taken");
                mapTouch.current = { initial: null, next: null, ID: null };
                abilityTouch.current = { initial: null, next: null, ID: null };
                setTouches({ mapTouch, abilityTouch });
            },
        })
    ).current;

    let mapX, mapY, abilityX, abilityY;
    if (touches.mapTouch.current.next) {
        mapX = touches.mapTouch.current.next.locationX;
        mapY = touches.mapTouch.current.next.locationY;
    }
    if (touches.abilityTouch.current.next) {
        abilityX = touches.abilityTouch.current.next.locationX;
        abilityY = touches.abilityTouch.current.next.locationY;
    }
    const mapDisp = useMemo(
        () => <MapContainer deviceDims={props.deviceDims} touches={touches.mapTouch.current}
            imgData={props.imgData} Character={props.Character} ></MapContainer>,
        [touches.mapTouch.current.ID, mapX, mapY]
    );
    const charDisp = useMemo(
        () => <CharacterDisplay {...props.deviceDims} Character={props.Character} touches={touches.abilityTouch.current} >
        </CharacterDisplay>,
        [props.Character.ID]
    );
    const abilityDisp = useMemo(() =>
        <AbilityButtonContainer deviceDims={props.deviceDims} Character={props.Character} touches={touches.abilityTouch.current} addEffect={addEffect} >
        </AbilityButtonContainer>,
        [props.Character.ID, abilityX, abilityY]
    );
    const effectsDisp = useMemo(() =>
        <EffectsContainer Character={props.Character} effect={effect} deviceDims={props.deviceDims} >
        </EffectsContainer>,
        [Object.keys(props.Character.DynamicData.AnimEffects).length, mapX, mapY, effect]
    );
    return (
        <View {...panResponder.panHandlers}
            style={{ width: props.deviceDims.deviceWidth, height: props.deviceDims.deviceHeight, zIndex: 100 }} >
            {mapDisp}
            {charDisp}
            {abilityDisp}
            {effectsDisp}
        </View>
    )
}

const addTouch = (newTouch, touches, setTouches, type) => {
    if (touches[type].current.initial) {
        console.log(type + " couldn't be added -- one already exists");
        return;
    }
    touches[type].current = { initial: newTouch, next: null, ID: newTouch.identifier };
    // console.log("Set " + type + " initial");
    setTouches({ ...touches });
}

const getRemovedTouch = (currentTouches, lastTouches) => {
    let total = 0;
    for (let i = 0; i < lastTouches.length; i++) {
        total += lastTouches[i].identifier;
        if (i < currentTouches.length) total -= currentTouches[i].identifier;
    }
    return total;
}

const removeTouch = (lastTouchID, touches, setTouches) => {
    if (lastTouchID === touches.mapTouch.current.ID) {
        touches.mapTouch.current = { initial: null, next: null, ID: null };
        // console.log("Removed mapTouch");
    }
    if (lastTouchID === touches.abilityTouch.current.ID) {
        touches.abilityTouch.current = { initial: null, next: null, ID: null };
        // console.log("Removed abilityTouch");
    }
    setTouches({ mapTouch: touches.mapTouch, abilityTouch: touches.abilityTouch });
}

const moveTouches = (evt, gesture, touches, setTouches) => {
    for (let i = 0; i < gesture.numberActiveTouches; i++) {
        if (evt.nativeEvent.touches[i].identifier === touches.mapTouch.current.ID) {
            touches.mapTouch.current = { ...touches.mapTouch.current, next: evt.nativeEvent.touches[i] };
        }
        else if (evt.nativeEvent.touches[i].identifier === touches.abilityTouch.current.ID) {
            touches.abilityTouch.current = { ...touches.abilityTouch.current, next: evt.nativeEvent.touches[i] };
        }
    }
    setTouches({ mapTouch: touches.mapTouch, abilityTouch: touches.abilityTouch });
}