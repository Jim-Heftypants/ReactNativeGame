import { View, Image, Text, StyleSheet } from "react-native";
import React from 'react';
import getImgDims from "./Utilities/getImgDims";

class CharacterDisplay extends React.Component {
    constructor(props) {
        super(props);
        const Character = this.props.Character;
        Character.Actions.updateAnimationSet(Character, "AttackCompiled");
        this.cycleImages = Character.DynamicData.currentAnimationSet;
        // console.log("cycleImages: " + JSON.stringify(this.cycleImages));
        this.animCycle = this.props.Character.DynamicData.imageCycleId;
        this.state = { animCycle: this.animCycle, cycleImages: this.cycleImages };
        const dims = getImgDims(this.props.characterSize, this.cycleImages[0][0].width,
                                this.cycleImages[0][0].height, this.props.displayScale);
        this.width = dims[0];
        this.height = dims[1];
        // this.width = dims[0] / (this.props.standardScale / this.props.characterSize);
        // this.height = dims[1] / (this.props.standardScale / this.props.characterSize);

        // console.log("dims: " + dims);
    }
    // logic should be in parent component
    // componentDidMount() {
    //     this.animator = setInterval(() => {
    //         this.updateImageCycle(this.cycleImages);
    //     }, 500);
    // }
    updateImageCycle() {
        // console.log("cycleImages uri: " + this.cycleImages[0].uri);
        this.animCycle++;
        this.animCycle %= this.cycleImages[0].length;
        // console.log("animCycle: " + this.animCycle);
        this.setState({
            animCycle: this.animCycle,
            cycleImages: this.cycleImages,
        });
    }
    componentWillUnmount() {
        clearInterval(this.animator);
    }
    render() {
        // console.log("Character: " + JSON.stringify(this.props.Character.Data.Attributes.Animations));
        // const Character = this.props.Character;
        const devWidth = this.props.deviceWidth;
        const devHeight = this.props.deviceHeight;
        const width = this.width;
        const height = this.height;
        const centerX = (devWidth / 2) - (width / 2);
        const centerY = (devHeight / 2) - (height / 2);
        const styles = StyleSheet.create({
            view: {
                position: 'absolute',
                marginTop: centerY,
                marginLeft: centerX,
                // marginTop: 50,
                // marginLeft: 100,
                width,
                height,
                // backgroundColor: 'red',
                zIndex: 5,
                alignItems: "center",
                justifyContent: 'center',
            },
            image: {
                width,
                height,
                position: 'absolute',
            }
        });
        // console.log("state: " + JSON.stringify(this.state));
        let i = 0;
        return (
            <View style={styles.view} >
                {this.cycleImages.map((imageList) => {
                    return (<Image key={i++} source={{ uri: imageList[this.animCycle].uri }} style={styles.image} ></Image>)
                }, this)}
                {/* <Image source={{ uri: this.cycleImages[0][this.animCycle].uri }} style={styles.image} ></Image> */}
            </View>
        )
    }
}

export default CharacterDisplay;