import React from 'react';
import { Text, TextInput, View, Image } from 'react-native';

import OpenWorldMapContainer from '../ViewComponents/OpenWorldMapContainer';
import CharacterContainer from '../ViewComponents/CharacterContainer';

import Characters from '../Base/Characters'
import getImgDims from '../ViewComponents/Utilities/getImgDims';

class GameDisplay extends React.Component {
    constructor(props) {
        super(props);
        const { uri, width, height } = Image.resolveAssetSource(this.props.img);
        const aspectRatio = width / height;
        const dims = getImgDims(this.props.deviceDims.mapScale, width, height, this.props.data.displayScale);
        const imgHeight = dims[1]; const imgWidth = dims[0];
        const widthMax = imgWidth - this.props.deviceDims.deviceWidth;
        const heightMax = imgHeight - this.props.deviceDims.deviceHeight;
        this.imgData = {
            imgWidth, imgHeight, uri, aspectRatio, widthMax, heightMax,
        }
    }
    render() {
        // console.log("data: " + JSON.stringify(this.props.data));
        // const Character = Characters[this.props.data.characterID];
        const Character = Characters[1]; // for testing
        return(
            <View style={{ width: this.props.deviceDims.deviceWidth, height: this.props.deviceDims.deviceHeight }} >
                <OpenWorldMapContainer {...this.props.deviceDims} Character={Character} {...this.imgData} ></OpenWorldMapContainer>
                <CharacterContainer deviceDims={this.props.deviceDims} Character={Character} ></CharacterContainer>
            </View>
        )
    }
}

export default GameDisplay;