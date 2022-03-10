import React from 'react';
import { View, Text } from 'react-native';

export default CharacterDisplay = (props) => {
    const text = "Character Display";
    return (
        <View style={props.style} >
            <Text style={{ fontSize: props.style.fontSize, textAlign: props.style.textAlign }} >{text}</Text>
        </View>
    )
}