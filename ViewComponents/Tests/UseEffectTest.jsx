import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';

export default UseEffectTest = (props) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("setting time");
            // setTime(time+1);
            setTime(time => time+1);
        }, 1000)
        return () => clearInterval(interval);
    }, [])

    return (
        <View style={{width: 1000, height: 1000, backgroundColor: 'blue', }}>
            <Text style={{fontSize: 30, color: 'black'}}>{time}</Text>
        </View>
    )
}