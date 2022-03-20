

export const testMap = wallMatrixToMap(testMapMatrix, 50);

const testMapMatrix = () => {
    const matrix = getDefaultedMatrix(100, 100);
    addWallsToBorder(matrix);
    for (let i = 20; i < 40; i++) {
        for (let j = 20; j < 40; j++) {
            matrix[i][j] = true;
        }
    }
    for (let i = 60; i < 80; i++) {
        for (let j = 60; j < 80; j++) {
            matrix[i][j] = true;
        }
    }
    return matrix;
}

const wallMatrixToMap = (matrix, nodeSize = 50) => {
    const graph = {};
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const siblings = getSiblings(matrix, i, j);
            const center = [i * size + size / 2, j * size + size / 2];
            graph[center] = Node(center, siblings, matrix[i][j], nodeSize);
        }
    }
    return graph;
}

class Node {
    constructor(center, siblings, unpathable = false, size = 50) {
        this.center = center;
        this.siblings = siblings;
        this.unpathable = unpathable;
        this.size = size;
        this.color = "green";
        if (unpathable) {
            this.color = "red";
        }
    }
}

const getSiblings = (matrix, i, j) => {
    const siblings = [];
    if (matrix[i-1][j]) siblings.push([i-1, j]);
    if (matrix[i-1][j-1]) siblings.push([i-1, j-1]);
    if (matrix[i][j-1]) siblings.push([i, j-1]);
    if (matrix[i+1][j]) siblings.push([i+1, j]);
    if (matrix[i+1][j+1]) siblings.push([i+1, j+1]);
    if (matrix[i][j+1]) siblings.push([i, j+1]);
    if (matrix[i+1][j-1]) siblings.push([i+1, j-1]);
    if (matrix[i-1][j+1]) siblings.push([i-1, j+1]);
    return siblings;
}

const getDefaultedMatrix = (x, y, value = false) => {
    const matrix = [];
    for (let i = 0; i < x; i++) {
        matrix.push([]);
        for (let j = 0; j < y; j++) {
            matrix[i].push(value);
        }
    }
    return matrix;
}

const addWallsToBorder = (matrix) => {
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[0][i] = true;
        matrix[matrix.length - 1][i] = true;
    }
    for (let i = 0; i < matrix.length; i++) {
        matrix[i][0] = true;
        matrix[i][matrix[0].length - 1] = true;
    }
}