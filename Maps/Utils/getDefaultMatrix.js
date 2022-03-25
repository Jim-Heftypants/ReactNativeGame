export default function getDefaultMatrix(x, y, value = false) {
    return getHexMatrix(x, y);
    // const matrix = [];
    // for (let i = 0; i < x; i++) {
    //     matrix.push([]);
    //     for (let j = 0; j < y; j++) {
    //         matrix[i].push(value);
    //     }
    // }
    // return matrix;
}

function getHexMatrix(x, y) {
    const min = 1;
    const max = x * y;
    const oDirs = [-1, -(x + 1), -x, 1, x, (x - 1)];
    const eDirs = [-1, -x, -(x - 1), 1, (x + 1), x];
    const matrix = [];
    for (let i = 0; i < x; i++) {
        matrix.push([]);
        for (let j = 0; j < y; j++) {
            const nodeID = getNodeID(i, j, x);
            const dirs = i % 2 === 0 ? oDirs : eDirs;
            const neighbors = getNeighbors(nodeID, dirs, min, max, i);
            matrix[i].push(neighbors);
        }
    }
    return matrix;
}

function getNodeID(i, j, x) {
    return (i * x) + j;
}

function getNeighbors(nodeID, dirs, min, max, x) {
    const neighbors = [];
    for (let i = 0; i < dirs.length; i++) {
        const neighborID = nodeID + dirs[i];
        if (neighborID < min || neighborID > max) neighbors.push(0);
        if (neighborID % x === 0 && nodeID - neighborID === -1) neighbors.push(0);
        if (neighborID % x === 1 && nodeID - neighborID === 1) neighbors.push(0);
        neighbors.push(neighborID);
    }
    return neighbors;
}