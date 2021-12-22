import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';

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
        // const charPosPre = this.props.Character.DynamicData.currentPosition;
        // const multiplier = this.props.characterSize / this.props.displayScale;
        // // console.log("multiplier: " + multiplier);
        // const charPos = [charPosPre[0] / multiplier, charPosPre[1] / multiplier];
        const charPos = this.props.Character.DynamicData.currentPosition;
        // console.log("charPos map: " + charPos);
        const imgStyle = StyleSheet.create({
            openWorldMap: {
                position: 'absolute',
                zIndex: 0,
                top: 0,
                left: 0,
                width: this.props.imgWidth,
                height: this.props.imgHeight,
            },
            spacer: {
                height: 0,
                width: 0,
                marginTop: charPos[1],
                marginLeft: charPos[0],
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