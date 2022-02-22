import React, {useState, useRef} from 'react';
import {View, Animated} from 'react-native';

export default AbilityComponent = (props) => {
    console.log("Creating abilityComponent");
    console.log(props?.styles);
    const opacity = 1;
    // const baseOpacity = props.rules.opacity ? props.rules.opacity : 1;
    // const animOpacity = useRef(new Animated.Value(baseOpacity)).current;
    // const opacity = props.rules.shouldFade ? animOpacity : baseOpacity;

    // if (props.rules.shouldFade) {
    //     Animated.timing(opacity, {
    //         toValue: 0,
    //         duration: props.rules.lifespan,
    //         useNativeDriver: true,
    //     }).start(({ finished }) => {/* signal to parent to remove this from render */});
    // }

    return (
        <View style={{ ...props.styles, backgroundColor: 'black', position: 'absolute' }} ></View> // styles not working
        // <View style={{ ...props.styles.main, backgroundColor: 'black', position: 'absolute'}} ></View> // styles not working
        // <View style={props.styles.main, { zIndex: 20, opacity: opacity }} >
        //     {props.component}
        // </View>
        // <Animated.View style={props.styles.main, {zIndex: 20, opacity: opacity}} >
        //     {props.component}
        // </Animated.View>
    )
}