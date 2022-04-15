export default function getDefaultMatrix(x, y, value = false) {
    return getHexMatrix(x, y);
}

function getHexMatrix(x, y) {
    const min = 1;
    const max = x * y;
    const evenDirs = [-1, -(x + 1), -x, 1, x, (x - 1)];
    const oddDirs = [-1, -x, -(x - 1), 1, (x + 1), x];
    // console.log("evenDirs:", evenDirs);
    // console.log("oddDirs:", oddDirs);
    const matrix = [];
    for (let i = 0; i < x; i++) {
        matrix.push([]);
        for (let j = 0; j < y; j++) {
            const nodeID = getNodeID(i, j, x);
            const dirs = j % 2 === 1 ? oddDirs : evenDirs;
            const neighbors = getNeighbors(nodeID, dirs, min, max, x);
            matrix[i].push(neighbors);
        }
    }
    return matrix;
}

function getNodeID(i, j, x) {
    return (j * x) + i + 1;
}

function getNeighbors(nodeID, dirs, min, max, x) {
    const neighbors = [];
    for (let i = 0; i < dirs.length; i++) {
        const neighborID = nodeID + dirs[i];
        if ((neighborID < min || neighborID > max) ||
            (neighborID % x === 0 && nodeID % x === 1) ||
            (neighborID % x === 1 && nodeID % x === 0)) {
                neighbors.push(0);
                // console.log("parentNode:", nodeID, "- 0 for neighbor:", neighborID, "- dirs:", dirs[i]);
                continue;
        }
        neighbors.push(neighborID);
    }
    return neighbors;
}