import { View, Image, Text } from "react-native";
import React from 'react';
import OpenWorldMap from "./OpenWorldMap";
import ControlCircle from "./ControlCircle";
import getImgDims from "./Utilities/getImgDims";

class OpenWorldMapContainer extends React.Component {
    constructor(props) {
        super(props);
        // console.log("Container props: " + JSON.stringify(this.props));
        const currentPos = this.props.Character.DynamicData.currentPosition;
        this.state = { x: currentPos[0], y: currentPos[1] }
        const {uri, width, height} = Image.resolveAssetSource(this.props.img);
        const aspectRatio = width / height;
        const dims = getImgDims(this.props.mapScale, width, height, this.props.displayScale);
        const imgHeight = dims[1]; const imgWidth = dims[0];
        const widthMax = imgWidth - this.props.deviceWidth;
        const heightMax = imgHeight - this.props.deviceHeight;
        // console.log("widthMax: " + widthMax + " heightMax: " + heightMax);
        this.imgData = {
            imgWidth, imgHeight, uri, aspectRatio, characterSize: this.props.characterSize,
            displayScale: this.props.displayScale, mapScale: this.props.mapScale,
            widthMax, heightMax,
        }
        this.charProps = {
            Character: this.props.Character,
            deviceWidth: this.props.deviceWidth,
            deviceHeight: this.props.deviceHeight,
        }
    }
    render() {
        // console.log("Container render called")
        // console.log("charPropsWidth: " + JSON.stringify(charProps.deviceWidth));
        return (
            <View>
                <OpenWorldMap {...this.charProps} {...this.imgData} />
                <ControlCircle that={this} {...this.charProps} {...this.imgData} />
            </View>
        )
    }
}

export default OpenWorldMapContainer;