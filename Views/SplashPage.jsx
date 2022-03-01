import React, { useState, useRef } from 'react';
import { Text, TextInput, View, Image, StyleSheet, PixelRatio, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { storeLocalData } from '../Utils/storageUtils';
import * as RTDB from '../Utils/firebaseRTDBUtils';
import * as Firestore from '../Utils/firebaseFirestoreUtils';

import { login, createAccount } from '../Utils/userAuth';

import Accounts from '../Classes/Accounts';

const SplashPage = (props) => {
    const animPos = useRef(new Animated.Value(0)).current;
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [userState, setUserState] = useState('Login');

    const styles = getStyles(props);

    const updatePosition = (mod) => {
        Animated.timing(animPos, {
            toValue: mod,
            duration: 600,
            useNativeDriver: true,
        }).start(({ finished }) => { });
    }

    const updateState = () => {
        if (userState === 'login') {
            _login();
        }
        _createAccount();
    }

    const _login = () => {
        login(username, password).then((userData) => {
            if (!userData.data) {
                console.log("Login data received is null");
                return;
            }
            console.log("Validated user credentials!", data.userID);
            let page = "Character Login";
            props.that.state.data.userID = userData.userID;
            props.that.setState({ page, data: props.that.state.data });
        })
    }

    const _createAccount = () => {
        createAccount(username, password).then((userID) => {
            if (!userID) {
                console.log("Account creation failed");
                return;
            }
            console.log("Account successfully created!", userID);
            let page = "Character Creation";
            props.that.state.data.userID = userData.userID;
            props.that.setState({ page, data: props.that.state.data });
        });
    }

    const changeTypeName = () => {
        if (userState === 'Login') return 'Create Account';
        return "Login";
    }

    const getTitle = () => {
        if (userState === 'Login') return 'Sign In';
        return "Sign Up";
    }

    return (
        <View>
            <Image source={props.img} style={styles.img} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={{ transform: [{ translateY: animPos }] }}>
                    <Text adjustsFontSizeToFit={true} style={styles.title}>{getTitle()}</Text>
                    <TextInput
                        onFocus={() => updatePosition(-100)}
                        onBlur={() => updatePosition(0)}
                        style={styles.textInput}
                        placeholder="Enter Username"
                        onChangeText={username => setusername(username)}
                        defaultValue={username}
                    />
                    <TextInput
                        onFocus={() => updatePosition(-100)}
                        onBlur={() => updatePosition(0)}
                        style={styles.textInput}
                        placeholder="Enter Password"
                        onChangeText={password => setpassword(password)}
                        defaultValue={password}
                    />
                    <View style={styles.submitButtonContainer} ><Text onPress={updateState} style={styles.submitButton} adjustsFontSizeToFit={true} >{userState}</Text></View>
                    <Text onPress={() => { setUserState(changeTypeName()) }} style={styles.changeTypeButton} >{changeTypeName() + ' instead?'}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default SplashPage;

function normalize(size, scale) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}

function getStyles(props) {
    const scale = props.deviceDims.deviceHeight / 600;
    // let adjustedFontSize = 1000;
    adjustedFontSize = normalize(50, scale); // if (Platform.OS != 'ios')
    return styles = StyleSheet.create({
        img: {
            width: props.deviceDims.deviceWidth,
            height: props.deviceDims.deviceHeight,
            zIndex: -5,
            position: 'absolute',
        },
        textInput: {
            marginTop: props.deviceDims.deviceHeight * 0.1,
            // height: props.deviceDims.deviceHeight * 0.1,
            marginLeft: props.deviceDims.deviceWidth * 0.05,
            width: props.deviceDims.deviceWidth * 0.9,
            zIndex: 10,
            backgroundColor: 'rgba(255,255,255,0.5)',
            color: 'black',
            textAlign: 'center',
            fontSize: normalize(30, scale),
            borderColor: 'black',
            borderWidth: props.deviceDims.deviceHeight * 0.01,
            borderRadius: 90,
            padding: normalize(10, scale),
            paddingLeft: normalize(20, scale),
            paddingRight: normalize(20, scale),
        },
        title: {
            fontSize: adjustedFontSize,
            width: props.deviceDims.deviceWidth,
            height: props.deviceDims.deviceHeight * 0.1,
            textAlign: 'center',
            marginTop: props.deviceDims.deviceHeight * 0.1,
            zIndex: 8,
        },
        submitButtonContainer: {
            borderRadius: 30,
            zIndex: 12,
            height: props.deviceDims.deviceHeight * 0.1,
            textAlign: 'center',
            marginTop: props.deviceDims.deviceHeight * 0.1,
            backgroundColor: 'rgba(0,100,200,0.7)',
            shadowOpacity: 1,
            shadowRadius: 8,
            shadowColor: 'black',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        submitButton: {
            fontSize: adjustedFontSize,
            textAlign: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            margin: 'auto',
        },
        changeTypeButton: {
            fontSize: adjustedFontSize / 2,
            zIndex: 12,
            // width: props.deviceDims.deviceWidth * 0.1,
            height: props.deviceDims.deviceHeight * 0.05,
            textAlign: 'center',
            marginTop: props.deviceDims.deviceHeight * 0.05,
            // backgroundColor: 'rgba(0,100,200,0.7)',
            shadowOpacity: 1,
            shadowRadius: 8,
            shadowColor: 'black',
            // marginLeft: props.deviceDims.deviceWidth * 0.45,
            margin: 'auto'
        },
    });
}