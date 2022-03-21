

export const testMap = wallMatrixToMap(testMapMatrix(), 50);

function testMapMatrix() {
    const matrix = getDefaultedMatrix(20, 20);
    addWallsToBorder(matrix);
    for (let i = 10; i < 15; i++) {
        for (let j = 10; j < 15; j++) {
            matrix[i][j] = true;
        }
    }
    // for (let i = 60; i < 80; i++) {
    //     for (let j = 60; j < 80; j++) {
    //         matrix[i][j] = true;
    //     }
    // }
    return matrix;
}

function getCenter(i, j, size) {
    return [i * size + size / 2, j * size + size / 2];
}

function wallMatrixToMap(matrix, size = 50) {
    // console.log(matrix);
    const graph = {};
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const center = getCenter(i, j, size);
            const siblings = getSiblings(matrix, i, j, size);
            graph[center] = {
                center,
                siblings,
                unpathable: matrix[i][j],
                size,
                color: matrix[i][j] ? "red" : "green"
            };
        }
    }
    // console.log(graph);
    return graph;
}

function getSiblings(matrix, i, j, size = 1) {
    const siblings = [];
    if (i > -1) siblings.push(getCenter(i-1, j, size));
    if (i > -1 && j > -1) siblings.push(getCenter(i - 1, j - 1, size));
    if (j > -1) siblings.push(getCenter(i, j - 1, size));
    if (matrix.length > i) siblings.push(getCenter(i + 1, j, size));
    if (matrix.length > i && matrix[0].length > j) siblings.push(getCenter(i + 1, j + 1, size));
    if (matrix[0].length > j) siblings.push(getCenter(i, j + 1, size));
    if (matrix.length > i && j > -1) siblings.push(getCenter(i + 1, j - 1, size));
    if (matrix[0].length > j && i > -1) siblings.push(getCenter(i - 1, j + 1, size));
    return siblings;
}

function getDefaultedMatrix(x, y, value = false) {
    const matrix = [];
    for (let i = 0; i < x; i++) {
        matrix.push([]);
        for (let j = 0; j < y; j++) {
            matrix[i].push(value);
        }
    }
    return matrix;
}

function addWallsToBorder(matrix) {
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[0][i] = true;
        matrix[matrix.length - 1][i] = true;
    }
    for (let i = 0; i < matrix.length; i++) {
        matrix[i][0] = true;
        matrix[i][matrix[0].length - 1] = true;
    }
}