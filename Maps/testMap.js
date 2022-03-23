import matrixToGraph from './Utils/matrixToGraph';
import getDefaultMatrix from './Utils/getDefaultMatrix';
import addWallsToMatrix from './Utils/addWallsToMatrix';
import randomizeMap from './Utils/randomizeMap';

const testMapMatrix = getDefaultMatrix(20, 20);
addWallsToMatrix(testMapMatrix);
const testGraph = matrixToGraph(testMapMatrix, 50);
// randomizeMap(testGraph);
export default testGraph;