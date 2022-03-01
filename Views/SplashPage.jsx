import React, { useState, useRef } from 'react';
import { Text, TextInput, View, Image, StyleSheet, PixelRatio, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { storeLocalData } from '../Utils/storageUtils';
import * as RTDB from '../Utils/firebaseRTDBUtils';
import * as Firestore from '../Utils/firebaseFirestoreUtils';
import { stringToHash } from '../Utils/hashingUtils';

import Accounts from '../Classes/Accounts';

// getData(collectionName);
// setData(collectionName, "User", documentValue);
// (async () => {
//   await updateKey(collectionName, "User", "user");
//   console.log("last");
// })();
// console.log("first");
// updateKey(collectionName, "User", "user").then(() => {
//   console.log("Key update successful!");
//   getData(collectionName, "user");
// })

// setCollectionDocument(collectionName, "Test", documentValue).then(() => {
//   console.log("Successfully set document data!");
//   getDataList(collectionName).then((data) => { console.log(data) });
// }).catch((err) => { console.log(err) });

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
            login();
        }
        createAccount();
    }

    const login = () => {
        let page = 1;
        let data = props.that.state.data;

        const loginHash = stringToHash(username, password);
        RTDB.getData("Users", loginHash).then((userData) => {
            if (!userData) {
                console.log("Invalid user credentials -- hash ==", loginHash);
                return;
            }
            data.accountID = loginHash;
            console.log("Validated user credentials -- accountID:", data.accountID);
            props.that.setState({ page, data });
        })
    }

    const createAccount = () => {
        const loginHash = stringToHash(username, password);
        RTDB.getData("Users", loginHash).then((userData) => {
            if (userData) {
                console.log("User already exists -- hash ==", loginHash);
                return;
            }
            RTDB.setData("Users", loginHash, { someKey: "someValue" });
            data.accountID = loginHash;
            console.log("Created new account -- accountID:", data.accountID);
            props.that.setState({ page, data });
        })
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