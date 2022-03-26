class QueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

export default class PriorityQueue {
    constructor() {
        this.items = [];
    }

    binarySearch(target) {
        let left = 0;
        let right = this.items.length - 1;
        while (left <= right) {
            let middle = Math.floor((left + right) / 2);
            if (this.items[middle].priority < target)
                left = middle + 1;
                if (this.items?.[left] && this.items[left].priority >= target) return left;
            else if (this.items[middle].priority > target)
                right = middle - 1;
                if (this.items?.[right] && this.items[right].priority <= target) return right;
            else
                return middle;
        }
        if (right < 0) return right;
        if (left > this.items.length - 1) return left;
        return null;
    }

    enqueue(element, priority) {
        const queueElement = new QueueElement(element, priority);
        const idx = this.binarySearch(priority);
        if (idx !== null) {
            if (idx < 0) this.items.unshift(queueElement);
            else if (idx == this.items.length) this.items.push(queueElement);
            else this.items.splice(idx, 0, queueElement);
        } else {
            console.log("no valid position found in binary search");
        }
    }

    dequeue() {
        if (this.isEmpty()) return null;
        // console.log(this.items);
        return this.items.shift().element;
    }

    lowest() {
        if (this.isEmpty()) return "No elements in Queue";
        return this.items[0].element;
    }

    highest() {
        if (this.isEmpty()) return "No elements in Queue";
        return this.items[this.items.length - 1].element;
    }

    isEmpty() {
        return this.items.length == 0;
    }
}