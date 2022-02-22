import React, { useState, useRef } from 'react';
import { View, Animated } from 'react-native';

export default AbilityComponent = (props) => {
    if (!props?.pos) {
        console.log("Missing AbilityComponent props");
        return <></>;
    }
    // console.log("Creating abilityComponent");
    // console.log(props.styles.main);

    // const baseOpacity = props.rules.opacity ? props.rules.opacity : 1;
    // const animOpacity = useRef(new Animated.Value(baseOpacity)).current;
    // const opacity = props.rules.shouldFade ? animOpacity : baseOpacity;

    const wOffset = -(props.params.prePos[0] - props.pos[0]);
    const hOffset = (props.params.prePos[1] - props.pos[1]);
    // console.log(wOffset, hOffset);
    const varStyles = {
        top: props.styles.main.top - hOffset,
        right: props.styles.main.right - wOffset,
    }
    // if (outOfBounds(varStyles, props.deviceDims)) return <></>;
    // console.log(varStyles);

    // if (props.rules.shouldFade) {
    //     Animated.timing(opacity, {
    //         toValue: 0,
    //         duration: props.rules.lifespan,
    //         useNativeDriver: true,
    //     }).start();
    // }

    return (
        <View style={{ ...props.styles.main, ...varStyles, zIndex: 20, opacity: 1 }} >
            {props.component}
        </View>
        // <Animated.View style={{ ...props.styles.main, ...varStyles, zIndex: 20, opacity: opacity }} >
        //     {props.component}
        // </Animated.View>
    )
}

const outOfBounds = (top, right, deviceDims) => {
    const height = deviceDims.height;
    const width = deviceDims.width;
    if (top < 0 || top > height) return true; // doesnt account for angles -- invalid
    if (right < 0 || right > width) return true;
    return false;
}