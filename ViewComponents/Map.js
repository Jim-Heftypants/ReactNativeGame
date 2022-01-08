import React from "react";
import { View, Image } from "react-native";

export default Map = (props) => {
    return (
        <View style={{ transform: [{ translateX: props.mapOffset.x }, { translateY: props.mapOffset.y }] }}>
            <Image source={{ uri: props.uri }} style={props.style} ></Image>
        </View>
    )
}