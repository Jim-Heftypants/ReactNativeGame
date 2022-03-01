import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalData = async (key) => {
    try {
        const data = await AsyncStorage.getItem('' + key);
        if (data === null) return data;
        try {
            const parsed = JSON.parse(data);
            return parsed;
        } catch(e) {
            return data;
        }
    } catch(e) {
        console.log("Fetch request for " + key + " failed");
    }
}

export const storeLocalData = async (key, value) => {
    try {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('' + key, jsonValue);
        } catch (e) {
            await AsyncStorage.setItem('' + key, value);
        }
    } catch (e) {
        
    }
}