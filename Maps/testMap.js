import matrixToGraph from './Utils/matrixToGraph';
import getDefaultMatrix from './Utils/getDefaultMatrix';
import addWallsToMatrix from './Utils/addWallsToMatrix';
import randomizeMap from './Utils/randomizeMap';

const testMapMatrix = getDefaultMatrix(20, 20, true);
// addWallsToMatrix(testMapMatrix);
const testGraph = matrixToGraph(testMapMatrix, 50);
randomizeMap(testGraph);
// let counter = 0;
// for (const key in testGraph) if (testGraph[key].unpathable) counter++;
// console.log("unpathable:", counter);
export default testGraph;