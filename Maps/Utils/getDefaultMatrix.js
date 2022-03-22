export default function getDefaultMatrix(x, y, value = false) {
    const matrix = [];
    for (let i = 0; i < x; i++) {
        matrix.push([]);
        for (let j = 0; j < y; j++) {
            matrix[i].push(value);
        }
    }
    return matrix;
}