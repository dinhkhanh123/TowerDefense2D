import { Container, Graphics } from "pixi.js";
import { Enemy } from "../models/Enemy";
import { ObjectPool } from "../utils/ObjectPool";
import { EnemyTypes } from "../types/EnemyTypes";
import { BfsPathfinding } from "../utils/BfsPathfinding";

export class EnemyController {
    private static instance: EnemyController;
    private map: Container;
    private enemies: Enemy[] = [];
    private objectPool: ObjectPool;
    private grid: number[][];

    private constructor(map: Container, grid: number[][]) {
        this.map = map;
        this.grid = grid;
        this.objectPool = new ObjectPool();
    }

    public static getInstance(map?: Container, grid?: number[][]): EnemyController {
        if (!EnemyController.instance) {
            if (map && grid) {
                EnemyController.instance = new EnemyController(map, grid);
            }

        }
        return EnemyController.instance;
    }

    // Tạo enemy mới dựa trên vị trí spawnPoint và mục tiêu
    public createEnemy(spawnPoint: { x: number, y: number }, goal: { x: number, y: number }, enemyType: string) {
        const enemy = this.objectPool.getEnemyFromPool(enemyType);

        enemy.sprite.x = spawnPoint.x * 64;
        enemy.sprite.y = spawnPoint.y * 64;

        const pathfinding = new BfsPathfinding(this.grid);

        enemy.setPosition(spawnPoint, goal, pathfinding);

        this.enemies.push(enemy);
        this.map.addChild(enemy.sprite);
    }

    //xóa enemy khi nó bị tiêu diệt
    removeEnemy(enemy: Enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index !== -1) {
            this.enemies.splice(index, 1);
            this.map.removeChild(enemy.sprite);

            ObjectPool.instance.returnEnemyToPool(enemy.name, enemy);
        }
    }

    update(deltaTime: number) {
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);

            if (enemy.hasReachedGoal()) {
                this.removeEnemy(enemy);
            }

            if (enemy.getUpdatePositionEnemy()) {
                console.log(enemy.position);
            }
        });
    }
}