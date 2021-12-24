import React, {useState} from 'react';
import { Text, TextInput, View, Image, StyleSheet, PixelRatio, ScrollView } from 'react-native';
import Accounts from '../Base/Accounts';

const SplashPage = (props) => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    // const scale = props.deviceDims.deviceWidth / 320;
    // function normalize(size) {
    //     const newSize = size * scale;
    //     if (Platform.OS === 'ios') {
    //         return Math.round(PixelRatio.roundToNearestPixel(newSize));
    //     } else {
    //         return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    //     }
    // }
    styles = StyleSheet.create({
        img: {
            width: props.deviceDims.deviceWidth,
            height: props.deviceDims.deviceHeight,
            zIndex: 5,
            position: 'absolute',
        },
        textInput: {
            marginTop: props.deviceDims.deviceHeight * 0.1,
            height: props.deviceDims.deviceHeight * 0.1,
            marginLeft: props.deviceDims.deviceWidth * 0.05,
            width: props.deviceDims.deviceWidth * 0.9,
            zIndex: 10,
            backgroundColor: 'rgba(255,255,255,0.5)',
            color: 'white',
            fontSize: 30,
            borderColor: 'black',
            borderWidth: 10,
            padding: 20,
        },
        title: {
            // fontSize: normalize(50),
            fontSize: 1000,
            width: props.deviceDims.deviceWidth,
            height: props.deviceDims.deviceHeight * 0.1,
            textAlign: 'center',
            marginTop: props.deviceDims.deviceHeight * 0.1,
            zIndex: 8,
        },
        submitButton: {
            fontSize: 1000,
            zIndex: 12,
            width: props.deviceDims.deviceWidth * 0.2,
            height: props.deviceDims.deviceHeight * 0.1,
            textAlign: 'center',
            marginTop: props.deviceDims.deviceHeight * 0.1,
            backgroundColor: 'rgba(0,100,200,0.7)',
            shadowOpacity: 1,
            shadowRadius: 8,
            shadowColor: 'black',
            marginLeft: props.deviceDims.deviceWidth * 0.4,
        }
    });

    const updateState = () => {
        let page = 1;
        let data = props.that.state.data;
        // username: 'PicklesOfDeath', password: '123' => characterID: 1
        if (Accounts[username] && Accounts[username].password == password) {
            data.characterID = Accounts[username].characterID;
            console.log("Validated user credentials -- characterID: " + data.characterID);
            props.that.setState({ page, data });
            return;
        }
        console.log("Invalid Credentials");
    }
    return (
        <View>
            <Image source={props.img} style={styles.img} />
            <Text adjustsFontSizeToFit={true} style={styles.title}>Enter Username and Password</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter Username"
                onChangeText={username => setusername(username)}
                defaultValue={username}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Enter Password"
                onChangeText={password => setpassword(password)}
                defaultValue={password}
            />
            <Text onPress={updateState} adjustsFontSizeToFit={true} style={styles.submitButton} >Submit</Text>
        </View>
    )
}

export default SplashPage;