import React, { useState, useRef } from 'react';
import { View, Animated } from 'react-native';

export default AbilityComponent = (props) => {
    if (!props?.pos) {
        console.log("Missing AbilityComponent props");
        return <></>;
    }
    console.log("Creating abilityComponent");
    // console.log(props.styles.main);
    // console.log(props.pos);

    // const baseOpacity = props.rules.opacity ? props.rules.opacity : 1;
    // const animOpacity = useRef(new Animated.Value(baseOpacity)).current;
    // const opacity = props.rules.shouldFade ? animOpacity : baseOpacity;

    const wOffset = (props.pos[0] - props.params.prePos[0]);
    const hOffset = (props.pos[1] - props.params.prePos[1]);
    console.log("W Offset: " + wOffset);
    const varStyles = {
        bottom: props.styles.main.bottom - hOffset,
        right: props.styles.main.right - wOffset,
    }

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