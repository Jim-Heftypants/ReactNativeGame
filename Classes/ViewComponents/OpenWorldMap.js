import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';
// import ControlCircle from "./ControlCircle";

class OpenWorldMap extends React.Component {
    panResponder = {
        onStartShouldSetResponder: () => true, // should respond to requests
        onMoveShouldSetResponder: () => true, // should take priority over other responders
        onResponderGrant: (evt) => { // view is responding from touch events
            console.log("Open World Map view priority granted");
        },
        onResponderReject: (evt) => { // another view is responding and won't release it
            console.log("Open World Map view priority rejected");
        },
        // onResponderMove: (evt) => { // user is moving finger
        //     console.log("Open World Map touch moved");
        // },
        onResponderRelease: (evt) => { // touch ended
            console.log("Open World Map touch ended");
        },
        onResponderTerminationRequest: (evt) => true, // allow other views to become responder
        onResponderTerminate: (evt) => { // responder taken from the view
            console.log("Open World Map view taken");
        },
    }
    render() {
        // console.log("Open world map render called");
        // console.log("OpenWorldMap props: " + JSON.stringify(this.props));
        const deviceWidth = this.props.deviceWidth; //full width
        const deviceHeight = this.props.deviceHeight; //full height
        const imgWidth = this.props.imgWidth;
        const imgHeight = this.props.imgHeight;
        const widthMax = imgWidth - deviceWidth;
        const heightMax = imgHeight - deviceHeight;
        const charPos = this.props.Character.DynamicData.currentPosition;
        if (charPos[0] > 1) charPos[0] = 1;
        if (charPos[0] < -widthMax) charPos[0] = -widthMax;
        if (charPos[1] > 1) charPos[1] = 1;
        if (charPos[1] < -heightMax) charPos[1] = -heightMax;
        const x = charPos[0];
        const y = charPos[1];
        const imgStyle = StyleSheet.create({
            openWorldMap: {
                position: 'absolute',
                zIndex: 0,
                top: 0,
                left: 0,
                width: imgWidth,
                height: imgHeight,
            },
            spacer: {
                height: 50,
                width: 50,
                marginTop: y,
                marginLeft: x,
                backgroundColor: 'transparent',
            }
        });
        return (
            <View {...this.panResponder} style={imgStyle.spacer} >
                <Image source={{ uri: this.props.uri }} style={imgStyle.openWorldMap} ></Image>
            </View>
        )
    }
}

export default OpenWorldMap;