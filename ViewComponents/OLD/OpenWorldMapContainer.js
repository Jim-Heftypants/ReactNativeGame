import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text } from "react-native";
import OpenWorldMap from "./OpenWorldMap";
import ControlCircle from "./ControlCircle";

const OpenWorldMapContainer = (props) => {
    // const fadeAnim = useRef(new Animated.Value(0)).current;
    const [animPos, setAnimPos] = useState( {x: 0, y: 0} );

    // map needs only uri, width, height
    return (
        <View>
            <View style={{ transform: [{ translateX: animPos.x }, { translateY: animPos.y }] }}>
                <OpenWorldMap uri={props.uri} imgWidth={props.imgWidth} imgHeight={props.imgHeight} />
            </View>
            <ControlCircle controlType={'transparent'} setAnimPos={setAnimPos} {...props} />
        </View>
    )
}

export default OpenWorldMapContainer;