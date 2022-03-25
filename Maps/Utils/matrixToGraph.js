export default function matrixToGraph(matrix, size = 50, color = "purple") {
    // console.log(matrix);
    const graph = {};
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const nodeID = getNodeID(i, j, matrix.length);
            const centerOffset = j % 2 === 0 ? size / 2 : size;
            const center = getCenter(i, j, size, centerOffset);
            const neighbors = matrix[i][j];
            // const neighbors = getneighbors(matrix, i, j, size);
            graph[nodeID] = {
                ID: nodeID,
                center,
                neighbors,
                size,
                pathableNeighbors: neighbors,
                color,
            };
        }
    }
    // console.log(graph);
    return graph;
}

function getNodeID(i, j, x) {
    return (j * x) + i + 1;
}

function getCenter(i, j, size, offset) {
    return [i * size + offset, (j * size * 0.86) + size / 2];
}

// function getneighbors(matrix, i, j, size = 1) {
//     const neighbors = {};
//     if (i > 0) neighbors.left = (getCenter(i-1, j, size));
//     if (i > 0 && j > 0) neighbors.bottomLeft = (getCenter(i - 1, j - 1, size));
//     if (j > 0) neighbors.bottom = (getCenter(i, j - 1, size));
//     if (matrix.length - 1 > i) neighbors.right = (getCenter(i + 1, j, size));
//     if (matrix.length - 1 > i && matrix[0].length - 1 > j) neighbors.topRight = (getCenter(i + 1, j + 1, size));
//     if (matrix[0].length - 1 > j) neighbors.top = (getCenter(i, j + 1, size));
//     if (matrix.length - 1 > i && j > 0) neighbors.bottomRight = (getCenter(i + 1, j - 1, size));
//     if (matrix[0].length - 1 > j && i > 0) neighbors.topLeft = (getCenter(i - 1, j + 1, size));
//     return neighbors;
// }

// function getneighbors(matrix, i, j, size = 1) {
//     const neighbors = [];
//     if (i > 0) neighbors.push(getCenter(i-1, j, size));
//     if (i > 0 && j > 0) neighbors.push(getCenter(i - 1, j - 1, size));
//     if (j > 0) neighbors.push(getCenter(i, j - 1, size));
//     if (matrix.length - 1 > i) neighbors.push(getCenter(i + 1, j, size));
//     if (matrix.length - 1 > i && matrix[0].length - 1 > j) neighbors.push(getCenter(i + 1, j + 1, size));
//     if (matrix[0].length - 1 > j) neighbors.push(getCenter(i, j + 1, size));
//     if (matrix.length - 1 > i && j > 0) neighbors.push(getCenter(i + 1, j - 1, size));
//     if (matrix[0].length - 1 > j && i > 0) neighbors.push(getCenter(i - 1, j + 1, size));
//     return neighbors;
// }