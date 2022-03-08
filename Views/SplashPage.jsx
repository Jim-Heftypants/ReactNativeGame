import React, { useState, useRef } from 'react';
import { Text, TextInput, View, Image, StyleSheet, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { login, createAccount } from '../Utils/userAuth';
import normalizeFont from '../Utils/normalizeFont';

const SplashPage = (props) => {
    const animPos = useRef(new Animated.Value(0)).current;
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
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
        if (userState === 'Login') {
            _login();
            return;
        }
        _createAccount();
    }

    const _login = () => {
        login(email, password).then((user) => {
            if (!user) {
                console.log("User does not exist");
                return;
            }
            console.log("Validated user credentials!", user.uid);
            let page = "Character Selection";
            props.setParentState({ ...props.parentState, page, userID: user.uid, username: user.displayName });
        })
    }

    const _createAccount = () => {
        createAccount(email, username, password).then((user) => {
            if (!user) {
                console.log("Account creation failed");
                return;
            }
            console.log("Account successfully created! User:", user.displayName);
            // let page = "Character Creation";
            let page = "Character Selection";
            props.setParentState({ ...props.parentState, page, userID: user.uid, username: user.displayName });
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

    let usernameInput = <></>;
    if (userState === 'Create Account') {
        usernameInput = <TextInput
            onFocus={() => updatePosition(-100)}
            onBlur={() => updatePosition(0)}
            style={styles.textInput}
            placeholder="Enter Username"
            onChangeText={username => setusername(username)}
            defaultValue={username}
        />
    }

    return (
        <View>
            <Image source={props.img} style={styles.img} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={{ transform: [{ translateY: animPos }] }}>
                    <Text adjustsFontSizeToFit={true} style={styles.title}>{getTitle()}</Text>
                    {usernameInput}
                    <TextInput
                        onFocus={() => updatePosition(-100)}
                        onBlur={() => updatePosition(0)}
                        style={styles.textInput}
                        placeholder="Enter Email"
                        onChangeText={email => setemail(email)}
                        defaultValue={email}
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

function getStyles(props) {
    const scale = props.deviceDims.height / 600;
    let adjustedFontSize = 1000;
    adjustedFontSize = normalizeFont(50, scale); // if (Platform.OS != 'ios')
    return StyleSheet.create({
        img: {
            width: props.deviceDims.width,
            height: props.deviceDims.height,
            zIndex: -5,
            position: 'absolute',
        },
        textInput: {
            marginTop: props.deviceDims.height * 0.05,
            // height: props.deviceDims.height * 0.1,
            marginLeft: props.deviceDims.width * 0.05,
            width: props.deviceDims.width * 0.9,
            zIndex: 10,
            backgroundColor: 'rgba(255,255,255,0.5)',
            color: 'black',
            textAlign: 'center',
            fontSize: normalizeFont(30, scale),
            borderColor: 'black',
            borderWidth: props.deviceDims.height * 0.01,
            borderRadius: 90,
            padding: normalizeFont(10, scale),
            paddingLeft: normalizeFont(20, scale),
            paddingRight: normalizeFont(20, scale),
        },
        title: {
            fontSize: adjustedFontSize,
            width: props.deviceDims.width,
            height: props.deviceDims.height * 0.1,
            textAlign: 'center',
            marginTop: props.deviceDims.height * 0.1,
            zIndex: 8,
        },
        submitButtonContainer: {
            borderRadius: 30,
            zIndex: 12,
            height: props.deviceDims.height * 0.1,
            textAlign: 'center',
            marginTop: props.deviceDims.height * 0.1,
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
            // width: props.deviceDims.width * 0.1,
            height: props.deviceDims.height * 0.05,
            textAlign: 'center',
            marginTop: props.deviceDims.height * 0.05,
            // backgroundColor: 'rgba(0,100,200,0.7)',
            shadowOpacity: 1,
            shadowRadius: 8,
            shadowColor: 'black',
            // marginLeft: props.deviceDims.width * 0.45,
            margin: 'auto'
        },
    });
}