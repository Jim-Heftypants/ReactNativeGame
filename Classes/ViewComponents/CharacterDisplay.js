import { View, Image, Text, StyleSheet } from "react-native";
import React from 'react';

class CharacterDisplay extends React.Component {
    constructor(props) {
        super(props);
        const Character = this.props.Character;
        Character.Actions.updateAnimationSet(Character, "AttackCompiled");
        this.cycleImages = Character.DynamicData.currentAnimationSet;
        // console.log("cycleImages: " + JSON.stringify(this.cycleImages));
        this.animCycle = this.props.Character.DynamicData.imageCycleId;
        this.state = { animCycle: this.animCycle, cycleImages: this.cycleImages };
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
        // console.log("charDisp width: " + this.props.deviceWidth);
        // const imgWidth = 150;
        // const imgHeight = 150;
        const devWidth = this.props.deviceWidth;
        const devHeight = this.props.deviceHeight;
        const dispScale = this.props.displayScale;
        // use width or height for img scale?
        const imgScale = devHeight * 0.25 * dispScale; // 1/4 screen height * user zoom setting
        // console.log("imgScale: " + imgScale);
        const aspectRatio = this.cycleImages[0][0].width / this.cycleImages[0][0].height;
        // pixel size shouldn't be relevant for display
        const width = imgScale * aspectRatio; 
        // console.log('width: ' + width);
        const height = imgScale;
        // console.log('height: ' + height);
        const charImgProps = {
            width,
            height,
            centerX: (devWidth / 2) - (width / 2),
            centerY: (devHeight / 2) - (height / 2),
        }
        // console.log("imgProps: " + JSON.stringify(charImgProps));
        const styles = StyleSheet.create({
            view: {
                position: 'absolute',
                marginTop: charImgProps.centerY,
                marginLeft: charImgProps.centerX,
                // marginTop: 50,
                // marginLeft: 100,
                width: width,
                height: height,
                // backgroundColor: 'red',
                zIndex: 5,
                alignItems: "center",
                justifyContent: 'center',
            },
            image: {
                width: width,
                height: height,
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