import React from 'react';
import { Image, View } from 'react-native';

import GameDisplay from './GameDisplay';
import getImgDims from '../Utils/getImgDims';

import Characters from '../Classes/Characters'

const GameDisplayContainer = (props) => {
    const { uri, width, height } = Image.resolveAssetSource(props.img);
    const dims = getImgDims(props.mapScales.mapScale, width, height, props.mapScales.displayScale);
    const widthMax = dims[0] - props.deviceDims.width;
    const heightMax = dims[1] - props.deviceDims.height;

    const Character = Characters[props.parentState.characterID];

    return (
        <GameDisplay imgData={{ img: props.img, uri, width, height, dims }} deviceDims={{ ...props.deviceDims, widthMax, heightMax }} Character={Character} ></GameDisplay>
    )
}

export default GameDisplayContainer;