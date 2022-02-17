import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import backgroundImg from '../../assets/LandscapeAssets/rpg-background.jpg';

export default Test = () => {
    const [animPos, setAnimPos] = useState({ x: 0, y: 0 });
    console.log("animPos");
    console.log(animPos);
    const { uri, width, height } = Image.resolveAssetSource(backgroundImg);
    const styles = {
        openWorldMap: {
            position: 'absolute',
            zIndex: 0,
            top: 0,
            left: 0,
            width: 1000,
            height: 1000,
        },
    };
    // setTimeout(() => {
    //     setAnimPos({x:animPos.x+2, y:animPos.y+2});
    // }, 500)
    return (
        <View>
            <View style={{ transform: [{ translateX: animPos.x }, { translateY: animPos.y }] }}>
                <Image source={{ uri }} style={styles.openWorldMap} ></Image>
            </View>
        </View>
    )
}