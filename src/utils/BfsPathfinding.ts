export class BfsPathfinding {
    private grid: number[][];

    constructor(grid: number[][]) {
        this.grid = grid;
    }

    bfs(start: { x: number, y: number }, goal: { x: number, y: number }): { x: number, y: number }[] | null {
        const directions = [
            { x: 0, y: 1 }, // Down
            { x: 1, y: 0 }, // Right
            { x: 0, y: -1 }, // Up
            { x: -1, y: 0 }, // Left
        ];

        const queue: { x: number, y: number, path: { x: number, y: number }[] }[] = [];
        const visited = Array.from({ length: this.grid.length }, () => Array(this.grid[0].length).fill(false));
        queue.push({ x: start.x, y: start.y, path: [{ x: start.x, y: start.y }] });

        while (queue.length > 0) {
            const { x, y, path } = queue.shift()!;

            if (x === goal.x && y === goal.y) {
                return path;
            }

            for (const dir of directions) {
                const nx = x + dir.x;
                const ny = y + dir.y;

                // Kiểm tra nếu điểm tiếp theo hợp lệ và chưa được thăm
                if (nx >= 0 && nx < this.grid[0].length && ny >= 0 && ny < this.grid.length && this.grid[ny][nx] === 1 && !visited[ny][nx]) {
                    visited[ny][nx] = true;
                    queue.push({ x: nx, y: ny, path: [...path, { x: nx, y: ny }] });
                }
            }
        }

        return null;
    }
}