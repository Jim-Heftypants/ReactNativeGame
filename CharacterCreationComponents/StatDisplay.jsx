import React from 'react';
import { View, Text } from 'react-native';

export default StatDisplay = (props) => {
    const text = props.style.right ? "Race Stats" : "Class Stats";
    return (
        <View style={props.style} >
            <Text style={{ fontSize: props.style.fontSize, textAlign: props.style.textAlign }} >{text}</Text>
        </View>
    )
}