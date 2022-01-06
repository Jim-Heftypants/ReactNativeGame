import React from 'react';
import { Image } from 'react-native';

import GameDisplay from './GameDisplay';
import getImgDims from '../ViewComponents/Utilities/getImgDims';

import Characters from '../Classes/Characters'

const GameDisplayContainer = (props) => {
    // parent == props.that
    const { uri, width, height } = Image.resolveAssetSource(props.img);
    const dims = getImgDims(props.deviceDims.mapScale, width, height, props.deviceDims.displayScale);
    const widthMax = dims[0] - props.deviceDims.deviceWidth;
    const heightMax = dims[1] - props.deviceDims.deviceHeight;

    const styles = {
        openWorldMap: {
            position: 'absolute',
            zIndex: -5,
            top: 0,
            left: 0,
            width: dims[0],
            height: dims[1],
        },
    };
    
    const Character = Characters[props.data.characterID]; // for testing

    return (
        <GameDisplay imgData={{ uri, width, height, dims }} deviceDims={{...props.deviceDims,widthMax,heightMax}}
            styles={styles} Character={Character} controlType={props.data.controlType} ></GameDisplay>
    )
}

export default GameDisplayContainer;