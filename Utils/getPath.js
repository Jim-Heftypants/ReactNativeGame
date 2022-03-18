export default function getPath(startPos, endPos, movementSpeed, map) {
    if (!map) {
        // linear path
        const dx = endPos.x - startPos.x;
        const dy = endPos.y - startPos.y;
        const distance = dx + dy;
        const movementPerFrame = distance / movementSpeed;
        const x = dx / movementPerFrame;
        const y = dy / movementPerFrame;
        const path = [];
        for (let i = 0; i < distance; i += movementPerFrame) {
            path.push({ x, y });
        }
        return path;
    }
    return null;
}