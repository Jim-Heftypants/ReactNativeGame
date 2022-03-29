export default class NodeCluster {
    constructor(center, ID) {
        this.center = center;
        this.ID = ID;
        this.drawable = <></>;
        this.children = {};
    }

    addChild(ID) {
        this.children[ID] = ID;
    }

}