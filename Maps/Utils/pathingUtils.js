import PriorityQueue from "../../Utils/PriorityQueue";

export function getPath(startID, endID, map) {
    const path = aStar(startID, endID, map);
    return path;
}

function getNearestNodeFromPos(pos) {
    let nodeID = 0;
    return nodeID;
}

function aStar(startID, endID, graph) {
    // console.log("startID:", startID);
    // console.log("endID:", endID);
    // const nodes = {};           nodes[startID] = graph[startID]; // map of all applicable nodes
    // let nodeLength = 1;
    
    const startScores = {};     startScores[startID] = 0; // distance from start node to node n
    const totalScores = {};     totalScores[startID] = getDistance(graph[startID].center, graph[endID].center, graph[startID].size); // startScore of start + distance between start and end node
    const pathMap = {}; // map of node traversal path
    const nodes = new PriorityQueue(); // node, priority
    nodes.enqueue(graph[startID], totalScores[startID]);
    const nodeSet = new Set(); nodeSet.add(graph[startID].ID); // ints

    while (!nodes.isEmpty()) {
        const minNode = nodes.dequeue();
        nodeSet.delete(minNode.ID);
        // const minNode = getMinNode(nodes, totalScores); // find node with minimum total distance
        // delete nodes[minNode.ID];
        // nodeLength--; // remove found node from pick list
        // console.log("minNode:", minNode.ID);
        if (minNode.ID == endID) return reconstruct_path(pathMap, endID, startID); // if node is end node return path

        for (const neighborID in minNode.pathableNeighbors) { // traverse pathable neighbors of min distance node
            if (neighborID === 0) continue;
            const neighbor = graph[neighborID];
            // console.log("neighbor:", neighborID);
            
            const potentialStartScore = startScores[minNode.ID] + getDistance(minNode.center, neighbor.center, minNode.size); // distance from start to min node to neighbor node
            if (!startScores[neighborID] || potentialStartScore < startScores[neighborID]) {
                pathMap[neighborID] = minNode.ID;
                startScores[neighborID] = potentialStartScore;
                totalScores[neighborID] = potentialStartScore + getDistance(neighbor.center, graph[endID].center, minNode.size);
                if (!nodeSet.has(neighbor.ID)) {
                    nodes.enqueue(neighbor, totalScores[neighborID]);
                    nodeSet.add(neighbor.ID);
                    // nodes[neighborID] = neighbor;
                    // nodeLength++;
                }
            }
        }
    }
    console.log("Failed to find solution to aStar path");
    return [];
}

function reconstruct_path(pathMap, endID, startID) {
    const total_path = [endID];
    let currentID = endID;
    // while (pathMap[currentNode.center]) {
    while (currentID != startID) {
        currentID = pathMap[currentID];
        total_path.unshift(currentID);
    }
    return total_path;
}

function getMinNode(nodes, scores) {
    const nodeIDs = Object.keys(nodes);
    let minVal = Infinity;
    let minNode = nodes[nodeIDs[0]];
    for (let i = 0; i < nodeIDs.length; i++) {
        if (!scores[nodeIDs[i]]) continue;
        if (scores[nodeIDs[i]] < minVal) {
            minVal = scores[nodeIDs[i]];
            minNode = nodes[nodeIDs[i]];
        }
    }
    return minNode;
}

function getDistance(a, b, size = null) {
    if (a[0] == b[0]) return Math.abs(a[1] - b[1]);
    if (a[1] == b[1]) return Math.abs(a[0] - b[0]);
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    if (size && dx === dy) return Math.round(1.4 * size * 10) / 10;
    return Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10;
}