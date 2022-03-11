import React from 'react';
import { View, ScrollView } from 'react-native';

import normalizeFont from '../Utils/normalizeFont';

export default CharacterSelectionScreen = (props) => {
    const fontScale = props.deviceDims.height / 600;
    const fontSize = normalizeFont(30, fontScale);

    return (
        <ScrollView style={{ backgroundColor: 'lightskyblue', height: props.deviceDims.height, width: props.deviceDims.width }} >
            {props.parentState.characterList.map((characterName) => {
                return <Text style={{ fontSize, textAlign: 'center', padding: fontSize / 4 }} >{characterName}</Text>;
            })}
        </ScrollView>
    )
}