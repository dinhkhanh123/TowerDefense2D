import { Container, Graphics } from "pixi.js";
import { Enemy } from "../models/Enemy";
import { ObjectPool } from "../utils/ObjectPool";
import { EnemyTypes } from "../types/EnemyTypes";
import { BfsPathfinding } from "../utils/BfsPathfinding";
import { LevelTypes } from "../types/LevelTypes";
import { PlayerController } from "./PlayerController";

export class EnemyController {
    public static instance: EnemyController;
    private map: Container;
    private enemies: Enemy[] = [];

    private grid: number[][];

    constructor(map: Container, grid: number[][]) {
        EnemyController.instance = this;
        this.map = map;
        this.grid = grid;
    }

    // Tạo enemy mới dựa trên vị trí spawnPoint và mục tiêu
    public createEnemy(spawnPoint: { x: number, y: number }, goal: { x: number, y: number }, enemyType: string) {
        const enemy = ObjectPool.instance.getEnemyFromPool(enemyType);

        enemy.sprite.x = spawnPoint.x * 64 + 32;
        enemy.sprite.y = spawnPoint.y * 64 + 32;

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

    getEnemy(): Enemy[] {
        return this.enemies;
    }

    update(deltaTime: number) {
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);

            if (!enemy.isAlive || enemy.hasReachedGoal()) {
                this.removeEnemy(enemy);
            }

            if (enemy.hasReachedGoal()) {
                PlayerController.instance.takeDamage(enemy.damage);
            }
        });
    }

    spawnEnemyFromLevel(levelData: LevelTypes) {
        let currentWaveIndex = 0;

        // Hàm spawn đợt (wave)
        const spawnWave = (waveIndex: number) => {
            const wave = levelData.waves[waveIndex];
            let enemiesInWave = 0; // Số lượng enemy trong wave hiện tại

            wave.enemies.forEach((enemyInfo) => {
                for (let i = 0; i < enemyInfo.count; i++) {
                    setTimeout(() => {
                        EnemyController.instance.createEnemy(
                            levelData.objectives.enemyPath[0],
                            levelData.objectives.defendPoint,
                            enemyInfo.type
                        );
                        enemiesInWave++; // Tăng số lượng enemy trong wave khi spawn
                    }, wave.spawnInterval * i);
                }
            });

            // Kiểm tra khi nào tất cả enemy trong wave này bị tiêu diệt
            const checkWaveCompletion = () => {
                if (EnemyController.instance.getEnemy().length === 0) {
                    // Khi tất cả quái bị tiêu diệt
                    console.log(`Wave ${waveIndex + 1} hoàn thành`);

                    currentWaveIndex++;
                    if (currentWaveIndex < levelData.waves.length) {
                        // Thêm khoảng thời gian chờ trước khi spawn wave tiếp theo
                        setTimeout(() => {
                            spawnWave(currentWaveIndex);
                        }, levelData.waveInterval);
                    } else {
                        console.log("Tất cả các wave đã hoàn thành");
                    }
                } else {
                    // Tiếp tục kiểm tra nếu vẫn còn quái vật sống
                    setTimeout(checkWaveCompletion, 1000); // Kiểm tra lại sau 1 giây
                }
            };

            // Bắt đầu kiểm tra wave hiện tại
            setTimeout(checkWaveCompletion, 1000); // Kiểm tra sau khi đợt spawn quái kết thúc
        };

        // Bắt đầu spawn đợt đầu tiên
        spawnWave(currentWaveIndex);
    }
}