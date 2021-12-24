import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';

const OpenWorldMap = (props) => {
    // const panResponder = {
    //     onStartShouldSetResponder: () => true, // should respond to requests
    //     onMoveShouldSetResponder: () => true, // should take priority over other responders
    //     onResponderGrant: (evt) => { // view is responding from touch events
    //         console.log("Open World Map view priority granted");
    //     },
    //     onResponderReject: (evt) => { // another view is responding and won't release it
    //         console.log("Open World Map view priority rejected");
    //     },
    //     // onResponderMove: (evt) => { // user is moving finger
    //     //     console.log("Open World Map touch moved");
    //     // },
    //     onResponderRelease: (evt) => { // touch ended
    //         console.log("Open World Map touch ended");
    //     },
    //     onResponderTerminationRequest: (evt) => true, // allow other views to become responder
    //     onResponderTerminate: (evt) => { // responder taken from the view
    //         console.log("Open World Map view taken");
    //     },
    // }
    const imgStyle = StyleSheet.create({
        openWorldMap: {
            position: 'absolute',
            zIndex: 0,
            top: 0,
            left: 0,
            width: props.imgWidth,
            height: props.imgHeight,
        },
        // spacer: {
        //     height: 0,
        //     width: 0,
        //     marginTop: charPos[1],
        //     marginLeft: charPos[0],
        //     backgroundColor: 'transparent',
        // }
    });
    return (
        <Image source={{ uri: props.uri }} style={imgStyle.openWorldMap} ></Image>
        // <View {...this.panResponder} style={imgStyle.spacer} >
        //     <Image source={{ uri: this.props.uri }} style={imgStyle.openWorldMap} ></Image>
        // </View>
    )
}

export default OpenWorldMap;