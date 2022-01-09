import React from 'react';
import {View, Image} from 'react-native';

export default MapDisplay = (props) => {
    return (
        <View style={{ transform: [{ translateX: props.mapOffset.current.x }, { translateY: props.mapOffset.current.y }] }}>
            <Image source={{ uri: props.uri }} style={props.style} ></Image>
        </View>
    )
}