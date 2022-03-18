import React, { useState, useMemo, useRef } from 'react';
import { Text, View, Image, PanResponder } from 'react-native';

import MapContainer from '../GameDisplayComponents/MapContainer';
import AbilityButtonContainer from '../GameDisplayComponents/AbilityButtonContainer';
import CharacterDisplay from '../GameDisplayComponents/CharacterDisplay';
import EffectsContainer from '../GameDisplayComponents/EffectsContainer';

import getPath from '../Utils/getPath';

export default GameDisplay = (props) => {
    const [endPos, setEndPos] = useState({ x: 0, y: 0 });
    const direction = useRef({ x: 0, y: 0 }).current;
    const path = useRef().current;

    function onTouchMove(evt) {
        const x = evt.nativeEvent.pageX;
        const y = evt.nativeEvent.pageY;
        const charPos = props.Character.dynamic.pos;
        path = getPath({ x, y }, charPos);
        setEndPos({ x, y });
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true, // should respond to requests
            onMoveShouldSetPanResponder: () => false, // should take priority over other responders
            onPanResponderGrant: (evt, gesture) => {
                onTouchMove(evt);
            },
            onPanResponderMove: (evt, gesture) => {
                onTouchMove(evt);
            },
            onPanResponderRelease: (evt, gesture) => {

            },
            onPanResponderTerminationRequest: (evt) => true, // allow other views to become responder
            onPanResponderTerminate: (evt, gesture) => { }, // responder taken from the view
        })
    ).current;
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
        [mapX, mapY, effect]
        // Object.keys(props.Character.DynamicData.AnimEffects).length, 
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