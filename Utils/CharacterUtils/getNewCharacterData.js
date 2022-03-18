import { getHealth, getMana } from './getHealthAndMana';
import getMovementSpeed from './getMovementSpeed';

export default function getNewCharacterData({race, klass, stats, name}) {
    const Races = {};
    Races[race] = 1;
    const Classes = {};
    Classes[klass] = 1;
    const movementSpeed = getMovementSpeed(Races, Classes, stats);
    return { // read: Any
        constant: { // write: UserID
            Races,
            Classes,
            Stats: stats,
            Zone: "Intro",
            Equipment: {},
            Items: {}, // maybe different write with item trades
            movementSpeed,
            pos: { x: 0, y: 0 },
        },
        dynamic: { // write: Any
            health: getHealth(stats),
            mana: getMana(stats),
            pos: { x: 0, y: 0 },
            movementSpeed,
            statusEffect: '',
        },
    }
}