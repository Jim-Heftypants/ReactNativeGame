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
        // const raceName = Character.Data.raceName;
        // const className = Character.Data.className;
        // const raceCycleImages = Character.Data.Attributes.Animations[`${raceName}AttackCompiled`];
        // const classCycleImages = Character.Data.Attributes.Animations[`${className}AttackCompiled`];
        // console.log("length: " + this.cycleImages[0].length);
        // console.log("animCycle: " + this.animCycle);
        const imgWidth = 150;
        const imgHeight = 150;
        const charImgProps = {
            width: imgWidth,
            height: imgHeight,
            centerX: (this.props.deviceWidth / 2) - (imgWidth / 2),
            centerY: (this.props.deviceHeight / 2) - (imgHeight / 2),
        }
        // console.log("imgProps: " + JSON.stringify(charImgProps));
        const styles = StyleSheet.create({
            view: {
                position: 'absolute',
                marginTop: charImgProps.centerY,
                marginLeft: charImgProps.centerX,
                width: charImgProps.width,
                height: charImgProps.height,
                // backgroundColor: 'red',
                zIndex: 5,
                alignItems: "center",
                justifyContent: 'center',
            },
            image: {
                width: imgWidth * 0.8,
                height: imgHeight * 0.95,
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