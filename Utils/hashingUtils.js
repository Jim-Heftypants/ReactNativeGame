import merge from '../mergeUsernamePassword';
import { sha256 } from 'react-native-sha256';

// export function stringToHash(username, password) {
//     const merged = merge(username, password);
//     let hash = 0;
//     if (merged.length == 0) return hash;
//     for (i = 0; i < merged.length; i++) {
//         char = merged.charCodeAt(i);
//         hash = ((hash << 5) - hash) + char;
//         hash = hash & hash;
//     }
//     return hash;
// }

export async function shaHash(username, password) {
    const merged = merge(username, password);
    return await sha256(merged);
}