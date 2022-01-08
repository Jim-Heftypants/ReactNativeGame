import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';

const OpenWorldMap = (props) => {
    const imgStyle = StyleSheet.create({
        openWorldMap: {
            position: 'absolute',
            zIndex: 0,
            top: 0,
            left: 0,
            width: props.imgWidth,
            height: props.imgHeight,
        },
    });
    return (
        <Image source={{ uri: props.uri }} style={imgStyle.openWorldMap} ></Image>
    )
}

export default OpenWorldMap;