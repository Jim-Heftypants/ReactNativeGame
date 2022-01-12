import React, {useState, useRef} from 'react';
import {View, Animated} from 'react-native';

export default AbilityComponent = (props) => {
    const baseOpacity = props.rules.opacity ? props.rules.opacity : 1;
    const animOpacity = useRef(new Animated.Value(baseOpacity)).current;
    const opacity = props.rules.shouldFade ? animOpacity : baseOpacity;

    if (props.rules.shouldFade) {
        Animated.timing(opacity, {
            toValue: 0,
            duration: props.rules.lifespan,
            useNativeDriver: true,
        }).start(({ finished }) => {/* signal to parent to remove this from render */});
    }

    return (
        <Animated.View style={{zIndex: 20, opacity: opacity}} >
            {props.component}
        </Animated.View>
    )
}