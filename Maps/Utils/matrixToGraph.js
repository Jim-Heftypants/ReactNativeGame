export default function matrixToGraph(matrix, size = 50) {
    // console.log(matrix);
    const graph = {};
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const center = getCenter(i, j, size);
            const neighbors = getneighbors(matrix, i, j, size);
            graph[center] = {
                center,
                neighbors, // adjacent
                unpathable: matrix[i][j],
                size,
                pathableNeighbors: {},
                // color: matrix[i][j] ? "red" : "green"
            };
        }
    }
    // console.log(graph);
    return graph;
}

function getCenter(i, j, size) {
    return [i * size + size / 2, j * size + size / 2];
}

function getneighbors(matrix, i, j, size = 1) {
    const neighbors = {};
    if (i > 0) neighbors.left = (getCenter(i-1, j, size));
    if (i > 0 && j > 0) neighbors.bottomLeft = (getCenter(i - 1, j - 1, size));
    if (j > 0) neighbors.bottom = (getCenter(i, j - 1, size));
    if (matrix.length - 1 > i) neighbors.right = (getCenter(i + 1, j, size));
    if (matrix.length - 1 > i && matrix[0].length - 1 > j) neighbors.topRight = (getCenter(i + 1, j + 1, size));
    if (matrix[0].length - 1 > j) neighbors.top = (getCenter(i, j + 1, size));
    if (matrix.length - 1 > i && j > 0) neighbors.bottomRight = (getCenter(i + 1, j - 1, size));
    if (matrix[0].length - 1 > j && i > 0) neighbors.topLeft = (getCenter(i - 1, j + 1, size));
    return neighbors;
}

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