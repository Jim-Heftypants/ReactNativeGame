import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react';

const circleDims = 100;

class AbilityDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.abilitiesObj = {};
        this.timer;
        // console.log("Abilities: " + JSON.stringify(this.props.Character.Data.Attributes.Abilities));
        const charAbilities = this.props.Character.Data.Attributes.Abilities;
        const entities = Object.entries(charAbilities);
        // console.log("entities: " + JSON.stringify(entities));
        for (let i = 0; i < entities.length; i++) {
            this.abilitiesObj[entities[i][0]] = {
                cooldown: entities[i][1].cooldown,
                currentCooldown: 0,
                baseColor: '255,0,0',
                cooldownColor: '0,0,255',
            // for (let j = 0; j < entities[i].length; j++) {
                }
            // }
        }
        this.abilitiesArr = Object.values(this.abilitiesObj);
        // console.log("abilitiesArr: " + JSON.stringify(this.abilitiesArr));
    }
    createStyle(ability) {
        // console.log("style ability: " + JSON.stringify(ability));
        const cooldown = ability.cooldown; // have to track seconds since cast manually
        const currentCooldown = ability.currentCooldown;
        const cdPercent = 1 - (currentCooldown / cooldown);
        console.log("cdPercent: " + cdPercent);
        const color = '255,0,0';
        const textColor = 'white';

        return StyleSheet.create({
            button: {
                // position: 'absolute',
                borderRadius: circleDims / 2,
                width: circleDims,
                height: circleDims,
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: `rgba(${color},${cdPercent})`, // color, opacity
            },
            text: {
                color: textColor,
            }
        });
    }
    updateCooldowns() {
        console.log("updating cooldowns");
        let count = 0;
        for (let i = 0; i < this.abilitiesArr.length; i++) {
            if (this.abilitiesArr[i].currentCooldown <= 0) continue;
            this.abilitiesArr[i].currentCooldown -= 1;
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
        this.timer = setInterval(() => {
            this.updateCooldowns();
        }, 100)
    }
    addCooldown(ability) {
        if (ability.currentCooldown != 0) return;
        console.log("ability added: " + JSON.stringify(ability));
        ability.currentCooldown = ability.cooldown;
        if (!this.timer) {
            this.trackCooldowns();
        }
        // activate ability
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    render() {
        let key = 0;
        console.log("abilitiesArr: " + JSON.stringify(this.abilitiesArr));
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