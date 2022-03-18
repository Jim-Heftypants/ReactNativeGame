import React from 'react';
import { Image, View } from 'react-native';

import GameDisplay from '../DeprecatedFiles/GameDisplay';
import getImgDims from '../Utils/getImgDims';

const GameDisplayContainer = (props) => {
    const { uri, width, height } = Image.resolveAssetSource(props.img);
    const dims = getImgDims(props.mapScales.mapScale, width, height, props.mapScales.displayScale);
    const widthMax = dims[0] - props.deviceDims.width;
    const heightMax = dims[1] - props.deviceDims.height;

    return (
        <GameDisplay imgData={{ img: props.img, uri, width, height, dims }} deviceDims={{ ...props.deviceDims, widthMax, heightMax }} Character={props.Character} ></GameDisplay>
    )
}

export default GameDisplayContainer;