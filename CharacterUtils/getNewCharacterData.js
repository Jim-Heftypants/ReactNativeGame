import { getHealth, getMana } from './getHealthAndMana';
import getMovementSpeed from './getMovementSpeed';

export default function getNewCharacterData({race, klass, stats, name}) {
    const Races = {};
    Races[race] = 1;
    const Classes = {};
    Classes[klass] = 1;
    return { // read: Any
        constant: { // write: UserID
            Races,
            Classes,
            Stats: stats,
            Zone: "Intro",
            Equipment: {},
            Items: {}, // maybe different write with item trades
            movementSpeed: getMovementSpeed(Races, Classes, stats),
            pos: [0, 0],
        },
        dynamic: { // write: Any
            health: getHealth(stats),
            mana: getMana(stats),
            pos: [0, 0],
            statusEffect: '',
        },
    }
}