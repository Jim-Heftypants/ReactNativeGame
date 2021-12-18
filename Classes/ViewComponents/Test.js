import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    action(ev, text) {
        console.log(ev.nativeEvent.locationX);
        console.log(text);
    }
    render() {
        return (
            <Dummy words={"This is a test"} action={this.action} ></Dummy>
        )
    }
}

class Dummy extends React.Component {
    constructor(props) {
        super(props);
        this.action = props.action;
        this.words = props.words
        console.log(this.props.action);
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={(ev) => this.action(ev, "button did the thing")} ><Text>Words</Text></TouchableOpacity>
                <Text>{this.words}</Text>
            </View>
        )
    }
}

// const Dummy = ({words, action}) => {
//     return (
//         <View>
//             <TouchableOpacity onPress={() => action()} ><Text>Words</Text></TouchableOpacity>
//             <Text>{words}</Text>
//         </View>
//     )
// }

export default Test;