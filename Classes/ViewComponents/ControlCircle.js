import React from "react";
import { View, Image, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const circleDims = 150;
const displacement = 20;
const addAspectRatio = true;

class ControlCircle extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.timer;
        this.touchX;
        this.touchY;
    }
    getRelPosVar(relative) {
        if (relative < 0) relative = 0;
        if (relative > circleDims) relative = circleDims;
        relative -= (circleDims / 2);
        relative /= displacement;
        return relative
    }
    getRelativePos(ev) {
        return [this.getRelPosVar(this.touchX), this.getRelPosVar(this.touchY)];
    }
    buttonFunc() {
        // console.log("this: " + JSON.stringify(this));
        // Alert.alert("Test")
        // console.log("locationX: " + JSON.stringify(ev.nativeEvent.locationX));
        const parent = this.props.that;
        const relPos = this.getRelativePos(this.event);
        const aspectRatio = this.props.aspectRatio; // width / height
        const charPos = this.props.Character.DynamicData.currentPosition;
        const widthMod = addAspectRatio ? relPos[0] * aspectRatio : relPos[0];
        charPos[0] ? charPos[0] -= widthMod : charPos[0] = widthMod;
        charPos[1] ? charPos[1] -= relPos[1] : charPos[1] = relPos[1];
        // console.log("Char pos: " + charPos);

        parent.setState({ x: charPos[0], y: charPos[1] });
        console.log("re-render from button triggered");
    }
    panResponder = {
        onStartShouldSetResponder: () => true, // should respond to requests
        onMoveShouldSetResponder: () => false, // should take priority over other responders
        onResponderGrant: (evt) => { // view is responding from touch events
            console.log("Control Circle view priority granted");
            // this.event = evt;
            this.touchX = evt.nativeEvent.locationX;
            this.touchY = evt.nativeEvent.locationY;
            this.timer = setInterval(() => {
                this.buttonFunc();
            }, 20);
        },
        onResponderReject: (evt) => { // another view is responding and won't release it
            console.log("Control Circle view priority rejected");
        },
        onResponderMove: (evt) => { // user is moving finger
            // console.log("Control Circle touch moved");
            // this.buttonFunc(evt);
            this.touchX = evt.nativeEvent.locationX;
            this.touchY = evt.nativeEvent.locationY;
        },
        onResponderRelease: (evt) => { // touch ended
            console.log("Control Circle touch ended");
            clearInterval(this.timer);
        },
        onResponderTerminationRequest: (evt) => true, // allow other views to become responder
        onResponderTerminate: (evt) => { // responder taken from the view
            console.log("Control Circle view taken");
            clearInterval(this.timer);
        },
    }
    render() {
        // console.log("Control Circle render called");
        // console.log("Circle Control props width: " + JSON.stringify(this.props.deviceWidth));
        const deviceWidth = this.props.deviceWidth;
        const deviceHeight = this.props.deviceHeight;
        const styles = StyleSheet.create({
            main: {
                position: 'absolute',
                alignItems: "center",
                justifyContent: 'center',
                // padding: 10,
                top: deviceHeight*0.5,
                left: deviceWidth*0.1,
                top: 200,
                left: 20,
                borderRadius: circleDims/2,
                width: circleDims,
                height: circleDims,
                backgroundColor: 'black',
                zIndex: 100,
            },
            text: {
                color: 'white',
                fontSize: 25,
            }
        });
        return (
            <View {...this.panResponder} style={styles.main} ></View>
        )
    }
}

export default ControlCircle;