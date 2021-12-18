import {StyleSheet} from 'react-native';

const textStyles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "red",
        fontSize: 30,
        backgroundColor: "blue",
        fontWeight: 'bold',
        width: '100%',
    },
    subHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "blue",
        fontSize: 25,
        backgroundColor: "white",
        fontStyle: 'italic',
        width: '100%',
    },
    default: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "blue",
        fontSize: 30,
        backgroundColor: "red",
        fontStyle: 'italic',
        width: '100%',
    }
});

export default textStyles;