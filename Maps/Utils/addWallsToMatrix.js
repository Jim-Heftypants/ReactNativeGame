export default function addWallsToMatrix(matrix) {
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[0][i] = true;
        matrix[matrix.length - 1][i] = true;
    }
    for (let i = 0; i < matrix.length; i++) {
        matrix[i][0] = true;
        matrix[i][matrix[0].length - 1] = true;
    }
}