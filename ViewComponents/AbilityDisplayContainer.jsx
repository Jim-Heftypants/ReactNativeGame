import { View, Image, Text } from "react-native";
import React, { useEffect, useState, useMemo } from 'react';

import AbilityDisplay from "./AbilityDisplay";
import TargettingDisplay from "./TargettingDisplay";

export default AbilityDisplayContainer = (props) => {

    const abilityDisp = useMemo(
        () => <AbilityDisplay {...props.deviceDims} Character={props.Character} touch={props.touches.initial} >
        </AbilityDisplay>, [props.Character.ID, props.touches.ID] // re-renders on new touch not touch change
    );
    const targettingDisp = useMemo(
        () => <TargettingDisplay {...props.deviceDims} Character={props.Character} touches={props.touches} >
        </TargettingDisplay>, [props.Character.ID, props.touches.next] // re-render on touch change
    );
    
    return (
        <>
            {abilityDisp}
            {targettingDisp}
        </>
    )
}