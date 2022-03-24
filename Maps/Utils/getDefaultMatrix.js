export default function getDefaultMatrix(x, y, value = false) {
    // const matrix = [];
    // for (let i = 0; i < x; i++) {
    //     matrix.push([]);
    //     for (let j = 0; j < y; j++) {
    //         matrix[i].push(value);
    //     }
    // }
    // return matrix;
    return getHexMatrix(x, y);
}

function getHexMatrix(x, y) {
    const min = 0;
    const max = x * y + 1;
    const dirs = [-1, 1, x, x + 1, -(x+1), -x];
    const matrix = [];
    for (let i = 0; i < x; i++) {
        matrix.push([]);
        for (let j = 0; j < y; j++) {
            const nodeID = getNodeID(i, j, x);
            const neighbors = getNeighbors(nodeID, dirs, min, max, i);
            matrix[i].push(neighbors);
        }
    }
    return matrix;
}

function getNodeID(i, j, x) {
    return (i * x) + j;
}

function getNeighbors(nodeID, dirs, min, max, len) {
    const neighbors = [];
    for (let i = 0; i < dirs.length; i++) {
        if (nodeID + dirs[i] === len) continue;
        // if (nodeID + dirs[i] === ) continue;
        if (nodeID + dirs[i] > min || nodeID + dirs[i] < max) {
            neighbors.push(nodeID + dirs[i]);
        }
    }
    return neighbors;
}