interface PathNode {
    x: number;
    y: number;
    f: number;  // f = g + h
    g: number;  // Chi phí từ điểm bắt đầu đến node hiện tại
    h: number;  // Chi phí ước tính từ node hiện tại đến đích
    parent?: PathNode;  // Để lưu vết đường đi
}

class AStarPathfinding {
    private grid: number[][]; // Lưới chứa thông tin map (0 là đường đi, 1 là vật cản)
    private openList: PathNode[] = [];
    private closedList: PathNode[] = [];
    private start: PathNode;
    private goal: PathNode;

    constructor(grid: number[][], start: { x: number, y: number }, goal: { x: number, y: number }) {
        this.grid = grid;
        this.start = { ...start, f: 0, g: 0, h: this.heuristic(start, goal) };
        this.goal = {
            ...goal,
            f: 0,    // Khởi tạo f = 0 cho điểm đích (f = g + h)
            g: 0,    // Khởi tạo g = 0 vì không có chi phí đi đến điểm đích
            h: this.heuristic(goal, goal)  // Khoảng cách từ goal đến chính nó là 0
        };
    }

    // Heuristic: Tính khoảng cách Manhattan
    private heuristic(pointA: { x: number, y: number }, pointB: { x: number, y: number }): number {
        return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);
    }

    // Kiểm tra tính hợp lệ của một node
    private isValid(x: number, y: number): boolean {
        return x >= 0 && y >= 0 && x < this.grid.length && y < this.grid[0].length && this.grid[x][y] === 0;
    }

    // Lấy các node hàng xóm (8 hướng di chuyển)
    private getNeighbors(node: PathNode): PathNode[] {
        const neighbors: PathNode[] = [];
        const directions = [
            { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 },
            { x: -1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }, { x: 1, y: -1 }
        ];

        for (const dir of directions) {
            const newX = node.x + dir.x;
            const newY = node.y + dir.y;
            if (this.isValid(newX, newY)) {
                neighbors.push({ x: newX, y: newY, f: 0, g: 0, h: 0 });
            }
        }
        return neighbors;
    }

    // Thuật toán A*
    public findPath(): { x: number, y: number }[] {
        this.openList.push(this.start);

        while (this.openList.length > 0) {
            // Lấy node có chi phí f nhỏ nhất
            let currentNode = this.openList.reduce((prev, curr) => prev.f < curr.f ? prev : curr);

            // Nếu đã đến đích, tạo lại đường đi
            if (currentNode.x === this.goal.x && currentNode.y === this.goal.y) {
                return this.retracePath(currentNode);
            }

            // Di chuyển node hiện tại vào closedList
            this.openList = this.openList.filter(node => node !== currentNode);
            this.closedList.push(currentNode);

            // Xử lý các node hàng xóm
            const neighbors = this.getNeighbors(currentNode);
            for (const neighbor of neighbors) {
                if (this.closedList.find(n => n.x === neighbor.x && n.y === neighbor.y)) {
                    continue;  // Bỏ qua nếu node đã được xử lý
                }

                const tentativeG = currentNode.g + 1; // Giả sử chi phí mỗi ô là 1
                let inOpenList = this.openList.find(n => n.x === neighbor.x && n.y === neighbor.y);

                if (!inOpenList || tentativeG < neighbor.g) {
                    neighbor.g = tentativeG;
                    neighbor.h = this.heuristic(neighbor, this.goal);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = currentNode;

                    if (!inOpenList) {
                        this.openList.push(neighbor);
                    }
                }
            }
        }

        return [];  // Trả về mảng rỗng nếu không tìm thấy đường đi
    }

    // Truy ngược lại đường đi
    private retracePath(node: PathNode): { x: number, y: number }[] {
        const path: { x: number, y: number }[] = [];
        let currentNode: PathNode | undefined = node;
        while (currentNode) {
            path.push({ x: currentNode.x, y: currentNode.y });
            currentNode = currentNode.parent;
        }
        return path.reverse(); // Đường đi từ start đến goal
    }
}
