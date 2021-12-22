import React from "react";
import { View, Image, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

class ControlCircle extends React.Component {
    constructor(props) {
        super(props);
        this.timer;
        this.touchX;
        this.touchY;
        this.circleDims = this.props.deviceHeight * 0.35;
    }
    getRelPosVar(relative) {
        if (relative < 0) relative = 0;
        if (relative > this.circleDims) relative = this.circleDims;
        relative -= (this.circleDims / 2);
        return relative
    }
    getRelativePos() {
        return [this.getRelPosVar(this.touchX), this.getRelPosVar(this.touchY)];
    }
    buttonFunc() {
        const parent = this.props.that;
        const relPos = this.getRelativePos(this.event);
        const posTotal = Math.abs(relPos[0]) + Math.abs(relPos[1]);
        let verticalPercent = 0; let horizontalPercent = 0;
        if (posTotal) {
            verticalPercent = relPos[1] / posTotal;
            horizontalPercent = relPos[0] / posTotal;
        }
        const charPos = this.props.Character.DynamicData.currentPosition;
        const movementSpeed = this.props.Character.DynamicData.movementSpeed;
        // console.log("widthMod: " + widthMod + " heightMod: " + heightMod);
        // console.log("horizontalPercent: " + horizontalPercent + " verticalPercent: " + verticalPercent);
        const posMod = movementSpeed / (this.props.characterSize / this.props.displayScale);
        charPos[0] -= (horizontalPercent * posMod);
        charPos[1] -= (verticalPercent * posMod);
        // console.log("Char pos pre: " + charPos);
        if (charPos[0] > 0) charPos[0] = 0;
        if (charPos[0] < -this.props.widthMax) charPos[0] = -this.props.widthMax;
        if (charPos[1] > 0) charPos[1] = 0;
        if (charPos[1] < -this.props.heightMax) charPos[1] = -this.props.heightMax;
        // console.log("Char pos: " + charPos);

        parent.setState({ x: charPos[0], y: charPos[1] });
        // console.log("re-render from button triggered");
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
        const styles = StyleSheet.create({
            main: {
                position: 'absolute',
                alignItems: "center",
                justifyContent: 'center',
                top: this.props.deviceHeight-(this.circleDims * 1.1),
                left: this.circleDims*0.2,
                borderRadius: this.circleDims/2,
                width: this.circleDims,
                height: this.circleDims,
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