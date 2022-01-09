import { View, Image, Text } from "react-native";
import React, { useEffect, useState, useMemo } from 'react';

import AbilityButtonContainer from "./AbilityButtonContainer";
import TargettingDisplay from "./TargettingDisplay";

export default AbilityDisplayContainer = (props) => {
    // console.log("Ability Container Loaded");

    const buttonDisp = useMemo( // memo works as intended
        () => <AbilityButtonContainer deviceDims={props.deviceDims} Character={props.Character} touch={props.touches.initial} >
        </AbilityButtonContainer>, [props.Character.ID, props.touches.ID] // re-renders on new touch not touch change
    );
    const targettingDisp = useMemo(
        () => <TargettingDisplay {...props.deviceDims} Character={props.Character} touches={props.touches} >
        </TargettingDisplay>, [props.Character.ID, props.touches.next] // re-render on touch change
    );
    
    return (
        <>
            {buttonDisp}
            {targettingDisp}
        </>
    )
}