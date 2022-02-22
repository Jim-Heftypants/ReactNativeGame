import AsyncStorage from '@react-native-async-storage/async-storage';

export const getJSONData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}

export const getData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        // if data is null, no data has been previously stored
        return data;
    } catch(e) {

    }
}

export const storeJSONData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
}

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        
    }
}