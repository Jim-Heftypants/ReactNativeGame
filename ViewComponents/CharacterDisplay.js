import { View, Image, Text, StyleSheet } from "react-native";
import React, {useState, useEffect, useRef} from 'react';
import getImgDims from "./Utilities/getImgDims";

export default CharacterDisplay = (props) => {
    updateAnimationSet(props.Character, "AttackCompiled");
    // const [cycleImages, setCycleImages] = useState(props.Character.DynamicData.currentAnimationSet);
    const cycleImages = useRef(props.Character.DynamicData.currentAnimationSet).current;
    const [animCycle, setAnimCycle] = useState(props.Character.DynamicData.imageCycleId);

    const dims = getImgDims(props.characterSize, cycleImages[0][0].width, cycleImages[0][0].height, props.displayScale);
    const width = dims[0]; const height = dims[1];

    // useEffect(() => {
    //     const animator = setInterval(() => {
    //         let temp = animCycle;
    //         temp++;
    //         temp %= cycleImages[0].length;
    //         setAnimCycle(() => temp);
    //     }, 500);
    //     return () => {
    //         clearInterval(animator)
    //     }
    // });
    const centerX = (props.deviceWidth / 2) - (width / 2);
    const centerY = (props.deviceHeight / 2) - (height / 2);
    const styles = {
        view: {
            position: 'absolute',
            marginTop: centerY,
            marginLeft: centerX,
            width,
            height,
            zIndex: 5,
            alignItems: "center",
            justifyContent: 'center',
        },
        image: {
            width,
            height,
            position: 'absolute',
        }
    };
    let i = 0;
    return (
        <View style={styles.view} >
            {cycleImages.map((imageList) => {
                return (<Image key={i++} source={{ uri: imageList[animCycle].uri }} style={styles.image} ></Image>)
            })}
            {/* <Image source={{ uri: this.cycleImages[0][this.animCycle].uri }} style={styles.image} ></Image> */}
        </View>
    )
}

const updateAnimationSet = (Character, setName) => {
    // console.log("Character: " + JSON.stringify(Character));
    // console.log("setName: " + setName);
    const animations = Character.Data.Attributes.Animations;
    // const Equipment = Object.values(Character.Data.Equipment);
    const names = [
        Character.Data.RaceName,
        Character.Data.ClassName,
        // ...Equipment,
    ]
    const animSet = [];
    for (let i = 0; i < names.length; i++) {
        animSet.push(animations[`${names[i]}${setName}`])
    }
    Character.DynamicData.currentAnimationSet = animSet;
}