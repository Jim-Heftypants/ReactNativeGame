import { View, Image, Text } from "react-native";
import React from 'react';
import OpenWorldMap from "./OpenWorldMap";
import ControlCircle from "./ControlCircle";

class OpenWorldMapContainer extends React.Component {
    state = { x: 0, y: 0 }
    refresh() {
        this.setState({ state: this.state });
    }
    getImgData() {
        const {uri, width, height} = Image.resolveAssetSource(this.props.img);
        const aspectRatio = width / height;
        
        const widthMultiplier = 1;
        const heightMultiplier = 1;

        const imgWidth = widthMultiplier * width;
        const imgHeight = heightMultiplier * height;

        return {imgWidth, imgHeight, uri, aspectRatio, imgScale: this.props.imgScale};
    }
    render() {
        // console.log("Container render called")
        const imgData = this.getImgData();
        const charProps = {
            Character: this.props.Character,
            deviceWidth: this.props.deviceWidth,
            deviceHeight: this.props.deviceHeight,
        }
        // console.log("charPropsWidth: " + JSON.stringify(charProps.deviceWidth));
        return (
            <View>
                <OpenWorldMap {...charProps} {...imgData} />
                <ControlCircle that={this} {...charProps} {...imgData} />
            </View>
        )
    }
}

export default OpenWorldMapContainer;