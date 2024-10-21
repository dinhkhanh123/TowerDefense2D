// src/types/LevelData.ts

// Xuất interface LevelData để các file khác có thể import
export interface LevelTypes {
    id: number;
    name: string;
    difficulty: string;
    map: {
        tiles: number[][];
        tileSize: number;
    };
    waves: Array<{
        enemies: Array<{ type: string; count: number }>;
        spawnInterval: number;
    }>;
    waveInterval: number;
    towersAvailable: Array<{ type: string; count: number }>;
    resources: {
        gold: number;
        mana: number;
    };
    objectives: {
        defendPoint: { x: number; y: number };
        enemyPath: Array<{ x: number; y: number }>;
    };
}
