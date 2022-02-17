import React, { useState, useRef } from 'react';
import { View, Animated } from 'react-native';

export default AbilityComponent = (props) => {
    console.log("Creating abilityComponent");
    console.log(props.styles.main);

    const baseOpacity = props.rules.opacity ? props.rules.opacity : 1;
    const animOpacity = useRef(new Animated.Value(baseOpacity)).current;
    const opacity = props.rules.shouldFade ? animOpacity : baseOpacity;

    const wOffset = (props.params.DynamicData.pos[0] - props.params.prePos[0]);
    const hOffset = (props.params.DynamicData.pos[1] - props.params.prePos[1]);
    console.log("W Offset: " + wOffset);
    const varStyles = {
        bottom: props.styles.main.bottom - hOffset,
        right: props.styles.main.right - wOffset,
    }

    if (props.rules.shouldFade) {
        Animated.timing(opacity, {
            toValue: 0,
            duration: props.rules.lifespan,
            useNativeDriver: true,
        }).start(({ finished }) => {/* signal to parent to remove this from render */ });
    }

    return (
        // <View style={props.styles.main, { zIndex: 20, opacity: opacity }} >
        //     {props.component}
        // </View>
        <Animated.View style={{ ...props.styles.main, ...varStyles, zIndex: 20, opacity: opacity }} >
            {props.component}
        </Animated.View>
    )
}