import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

class ControlCircle extends React.Component {
    constructor(props) {
        super(props);
        this.timer;
        this.touchX; this.touchY;
        this.initialTouchX; this.initialTouchY;
        this.circleDims = this.props.deviceHeight * 0.35;

        this.controlType = this.props.controlType;
        this.grant;
        this.onMove;
        this.setControlFunctions();
    }
    setControlFunctions() {
        this.grant = (evt) => {
            this.initialTouchX = evt.nativeEvent.locationX;
            this.initialTouchY = evt.nativeEvent.locationY;
            this.touchX = this.initialTouchX;
            this.touchY = this.initialTouchY;
            // console.log("initialTouch x: " + this.initialTouchX + ", y: " + this.initialTouchY);
            this.timer = setInterval(() => {
                this.buttonFunc();
            }, 20);
        }
        this.onMove = (evt) => {
            let x = evt.nativeEvent.touches[0].locationX;
            let y = evt.nativeEvent.touches[0].locationY;
            // console.log("Touches detected with locations: ");
            // pick left-most touch
            let minLeft = evt.nativeEvent.touches[0].pageX;
            for (let i = 1; i < evt.nativeEvent.touches.length; i++) {
                const touch = evt.nativeEvent.touches[i];
                // console.log(touch.pageX);
                if (touch.pageX < minLeft) {
                    x = touch.locationX;
                    y = touch.locationY;
                    minLeft = touch.pageX;
                }
            }
            // console.log("Chose: " + x);
            this.touchX = x;
            this.touchY = y;
        }
    }
    getRelPosVar(touch) {
        if (touch < 0) touch = 0;
        if (touch > this.circleDims) touch = this.circleDims;
        touch -= (this.circleDims / 2);
        return touch;
    }
    buttonFunc() {
        // const parent = this.props.that; // no longer valid
        let relPos;
        if (this.controlType === 'transparent') {
            // console.log("touchX: " + this.touchX + " touchY: " + this.touchY);
            relPos = [this.touchX - this.initialTouchX, this.touchY - this.initialTouchY];
        } else { relPos = [this.getRelPosVar(this.touchX), this.getRelPosVar(this.touchY)]; }
        // console.log("relPos: " + relPos);
        const posTotal = Math.abs(relPos[0]) + Math.abs(relPos[1]);
        if (posTotal < 10) return;
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

        this.props.setAnimPos( { x: charPos[0], y: charPos[1] } );
        // this.props.setState({ x: charPos[0], y: charPos[1] });
        // console.log("re-render from button triggered");
    }
    panResponder = {
        onStartShouldSetResponder: () => true, // should respond to requests
        onMoveShouldSetResponder: () => false, // should take priority over other responders
        onResponderGrant: (evt) => this.grant(evt),
        onResponderReject: (evt) => { // another view is responding and won't release it
            console.log("Control Circle view priority rejected");
        },
        onResponderMove: (evt) => this.onMove(evt),
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
            circle: {
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
            transparent: {
                width: this.props.deviceWidth / 2,
                height: this.props.deviceHeight,
                backgroundColor: 'transparent',
                // backgroundColor: 'pink',
                position: 'absolute',
                zIndex: 100,
            },
        });
        return (
            <View {...this.panResponder} style={styles[this.controlType]} ></View>
        )
    }
}

export default ControlCircle;