import React from 'react';
import { View, Text } from 'react-native';

export default SelectionDisplay = (props) => {
    const text = props.style.right ? "Race Name" : "Class Name";
    return (
        <View style={{ ...props.style }} >
            <Text style={{ fontSize: props.style.fontSize, textAlign: props.style.textAlign }} >{text}</Text>
        </View>
    )
}