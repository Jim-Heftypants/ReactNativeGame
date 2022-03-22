export default function randomizeMap(graph) {
    const randomIdx = Math.floor(Math.random() * Object.keys(graph).length);
    // const randomIdx = 50;
    console.log("idx:",randomIdx);
    const startKey = Object.keys(graph)[randomIdx];
    const startNode = graph[startKey];
    console.log("startNode:",startNode.center);

    // const paths = new Set();
    const newNeighbors = {};
    const visited = new Set();
    const stack = [startNode];
    let count = 0;
    while (stack.length > 0) {
        const node = stack.pop();
        const neighborKey = getUnvisitedSibling(node, visited);
        // console.log("neighborPos:",neighborPos);
        if (neighborKey) {
            const neighbor = node.neighbors[neighborKey];
            stack.push(node);
            stack.push(graph[neighbor]);
            visited.add(neighbor);
            // delete wall between node and sibling
            node.pathableNeighbors[neighborKey] = neighbor;
            graph[neighbor].pathableNeighbors[oppNeighborKey(neighborKey)] = node.center;

            // if (!newNeighbors[node.center]) newNeighbors[node.center] = [];
            // if (!newNeighbors[neighborPos]) newNeighbors[neighborPos] = [];
            // newNeighbors[node.center].push(neighborPos);
            // newNeighbors[neighborPos].push(node.center);
            // paths.add(node.center);
            // paths.add(neighborPos);
        }
    }
    // console.log("visited:", visited);
    // let counter = 0;
    // for (const key in newNeighbors) {
    //     counter++;
    //     graph[key].neighbors = newNeighbors[key];
    // }
    // console.log("counter:",counter);
}

function getUnvisitedSibling(node, visited) { // not randomized right now
    for (const key in node.neighbors) {
        if (!visited.has(node.neighbors[key])) return key;
    }
    return null;
}

function oppNeighborKey(key) {
    if (key === "topLeft") return "bottomRight";
    if (key === "bottomRight") return "topLeft";
    if (key === "topRight") return "bottomLeft";
    if (key === "bottomLeft") return "topRight";
    if (key === "left") return "right";
    if (key === "right") return "left";
    if (key === "top") return "bottom";
    if (key === "bottom") return "top";
    return "ur fooked m8";
}