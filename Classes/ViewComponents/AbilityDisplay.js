import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react';

const circleDims = 100;

class AbilityDisplay extends React.Component {
    constructor(props) {
        super(props);
        // console.log("Dev width in abilityDisplay: " + this.props.deviceWidth);
        this.abilitiesObj = {};
        this.timer;
        const charAbilities = this.props.Character.Data.Attributes.Abilities;
        // console.log("charAttributes: " + JSON.stringify(this.props.Character.Data.Attributes));
        // console.log("charAbilities: " + JSON.stringify(charAbilities));
        // { name: [name, levelReq, currentCD, cd, func, onCDColor, baseColor]}
        this.abilitiesArr = Object.values(charAbilities);
        // modding this will not update values for character object
    }
    createStyle(ability) {
        // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
        // console.log("style ability: " + ability);
        const cdPercent = 1 - (ability[2] / ability[3]);
        // console.log("cdPercent: " + cdPercent);
        const color = ability[2] ? ability[6] : ability[5];
        const textColor = ability[2] ? ability[6] : ability[5];

        return StyleSheet.create({
            button: {
                // position: 'absolute',
                marginLeft: 300,
                marginTop: 20,
                borderRadius: circleDims / 2,
                width: circleDims,
                height: circleDims,
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: `rgba(${color},${cdPercent})`, // color, opacity
            },
            text: {
                color: `rgb(${textColor})`,
            }
        });
    }
    updateCooldowns(interval) {
        // console.log("updating cooldowns");
        // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
        let count = 0;
        for (let i = 0; i < this.abilitiesArr.length; i++) {
            if (this.abilitiesArr[i][2] < 0) {
                this.abilitiesArr[i][2] = 0;
                console.log("ability now off cooldown");
            }
            if (this.abilitiesArr[i][2] === 0) continue;
            this.abilitiesArr[i][2] -= (interval / 1000);
            count++;
        }
        if (!count) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.setState({ state: this.state });
    }
    trackCooldowns() {
        console.log("beginning cooldown intervel");
        const interval = 100;
        this.timer = setInterval(() => {
            this.updateCooldowns(interval);
        }, interval)
    }
    addCooldown(ability) {
        // [name, levelReq, currentCD, cd, func, onCDColor, baseColor]
        if (ability[2] != 0) return;
        // console.log("ability added: " + JSON.stringify(ability));
        ability[2] = ability[3];
        if (!this.timer) {
            this.trackCooldowns();
        }
        // activate ability
        ability[4](this.props.Character, "some data");
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    render() {
        let key = 0;
        // console.log("abilitiesArr: " + JSON.stringify(this.abilitiesArr));
        return (
            <View>
                {this.abilitiesArr.map((ability) => {
                    // console.log("ability: " + JSON.stringify(ability));
                    const styles = this.createStyle(ability);
                    return (
                        <TouchableOpacity key={key++} onPress={() => this.addCooldown(ability)} style={styles.button}>
                            <Text style={styles.text} >Click Me</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

export default AbilityDisplay;




// panResponder = {
//     onStartShouldSetResponder: () => true, // should respond to requests
//     onMoveShouldSetResponder: () => false, // should take priority over other responders
//     onResponderGrant: (evt) => { // view is responding from touch events
//         console.log("Ability Button view priority granted");
//         // get ability text from evt's child Text
//         // Character.Attributes.Abilities["text"] or Character.Attributes.Traits["text"]
//         this.addCooldown();
//         // this.trackCooldowns();
//     },
//     onResponderReject: (evt) => { // another view is responding and won't release it
//         console.log("Ability Button view priority rejected");
//     },
//     onResponderRelease: (evt) => { // touch ended
//         console.log("Ability Button touch ended");
//     },
//     onResponderTerminationRequest: (evt) => true, // allow other views to become responder
//     onResponderTerminate: (evt) => { // responder taken from the view
//         console.log("Ability Button view taken");
//     },
// }