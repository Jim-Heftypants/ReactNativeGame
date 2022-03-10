import React from 'react';
import { View, Text } from 'react-native';

export default DescriptionDisplay = (props) => {
    const text = props.style.right ? "Race Description" : "Class Description";
    return (
        <View style={props.style} >
            <Text style={{ fontSize: props.style.fontSize, textAlign: props.style.textAlign }} >{text}</Text>
        </View>
    )
}