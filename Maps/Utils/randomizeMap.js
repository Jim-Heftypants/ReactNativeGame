export default function randomizeMap(graph) {
    const randomIdx = Math.floor(Math.random() * Object.keys(graph).length);
    // const randomIdx = 50;
    console.log("idx:",randomIdx);
    const startKey = Object.keys(graph)[randomIdx];
    const startNode = graph[startKey];
    console.log("startNode:",startNode.center[0], ',', startNode.center[1]);

    const newNeighbors = {};
    const visited = new Set();
    const stack = [startNode];
    while (stack.length > 0) {
        const node = stack.pop();
        const neighborID = getUnvisitedSibling(node, visited);
        // console.log("neighborPos:",neighborPos);
        if (neighborID) {
            const neighbor = graph[neighborID];
            stack.push(node);
            stack.push(neighbor);
            visited.add(neighbor.ID);
            // delete wall between node and sibling

            // node.pathableNeighbors[neighborID] = neighbor;
            // graph[neighbor].pathableNeighbors[oppNeighborKey(neighborID)] = node.center;
            if (!newNeighbors[node.ID]) newNeighbors[node.ID] = [];
            if (!newNeighbors[neighbor.ID]) newNeighbors[neighbor.ID] = [];
            newNeighbors[node.center].push(neighbor.ID);
            newNeighbors[neighborPos].push(node.ID);
        }
    }
    let counter = 0;
    for (const nodeID in newNeighbors) {
        counter++;
        graph[nodeID].pathableNeighbors = newNeighbors[nodeID];
    }
    console.log("counter:",counter);
}

function getUnvisitedSibling(node, visited) {
    const unvisited = [];
    for (const neighborID in node.neighbors) {
        if (neighborID === 0) continue;
        if (!visited.has(neighborID)) unvisited.push(neighborID);
    }
    if (unvisited.length === 0) return null;
    const randomIdx = Math.floor(Math.random() * unvisited.length);
    return node.neighbors[randomIdx];
}

// function oppNeighborKey(key) {
//     if (key === "topLeft") return "bottomRight";
//     if (key === "bottomRight") return "topLeft";
//     if (key === "topRight") return "bottomLeft";
//     if (key === "bottomLeft") return "topRight";
//     if (key === "left") return "right";
//     if (key === "right") return "left";
//     if (key === "top") return "bottom";
//     if (key === "bottom") return "top";
//     return "ur fooked m8";
// }