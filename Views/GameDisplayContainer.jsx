import React from 'react';
import { Image, View } from 'react-native';

import GameDisplay from './GameDisplay';
import getImgDims from '../ViewComponents/Utilities/getImgDims';

import Characters from '../Classes/Characters'

const GameDisplayContainer = (props) => {
    // console.log(props.img);
    // parent == props.that
    const { uri, width, height } = Image.resolveAssetSource(props.img);
    const dims = getImgDims(props.deviceDims.mapScale, width, height, props.deviceDims.displayScale);
    const widthMax = dims[0] - props.deviceDims.deviceWidth;
    const heightMax = dims[1] - props.deviceDims.deviceHeight;
    
    const Character = Characters[props.data.characterID]; // for testing

    return (
        <GameDisplay imgData={{ img: props.img, uri, width, height, dims }} deviceDims={{...props.deviceDims,widthMax,heightMax}}
            Character={Character} controlType={props.data.controlType} ></GameDisplay>
    )
}

export default GameDisplayContainer;