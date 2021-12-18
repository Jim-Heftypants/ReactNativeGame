import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react';

const circleDims = 100;

class AbilityDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.abilities = {};
        this.timer;
        const charAbilities = this.props.Character.Attributes.Abilities;
        const entities = Object.entries(charAbilities);
        for (let i = 0; i < entities.length; i++) {
            this.abilities[entities[i][0]] = {
                cooldown: entities[i][1],
                currentCooldown: 0,
                baseColor: '255,0,0',
                cooldownColor: '0,0,255',
            }
        }
        this.cooldowns = [];
    }
    createStyle(ability) {
        const cooldown = ability.cooldown; // have to track seconds since cast manually
        const currentCooldown = ability.currentCooldown;

        const color = '255,0,0';
        return StyleSheet.create({
            button: {
                position: 'absolute',
                borderRadius: circleDims / 2,
                width: circleDims,
                height: circleDims,
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: `rgba(${color},${cooldown/currentCooldown})`, // color, opacity
            },
            text: {
                color: 'white',
            }
        });
    }
    updateCooldowns() {
        for (let i = 0; i < this.cooldowns.length; i++) {
            this.cooldowns[i].currentCooldown -= 0.1;
            if (this.cooldowns[i].currentCooldown <= 0) {
                // remove ability from this.cooldowns
                i--;
            }
        }
        if (this.cooldowns.length == 0) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    trackCooldowns() {
        this.timer = setInterval(() => {
            this.updateCooldowns();
        }, 100)
    }
    addCooldown(ability) {
        ability.currentCooldown = ability.cooldown;
        if (!this.timer) {
            this.trackCooldowns();
        }
        this.cooldowns.push(ability);
    }
    render() {
        const styles = this.createStyle({ cooldown: 10 });
        
        return (
            <View>
                {
                    this.abilities.map((ability) => {
                        return (
                            <TouchableOpacity onPress={() => this.addCooldown(ability)} style={styles.button}>
                                <Text style={styles.text} >Click Me</Text>
                            </TouchableOpacity>
                        )
                    })
                }
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