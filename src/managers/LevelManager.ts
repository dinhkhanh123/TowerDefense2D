// src/managers/LevelManager.ts
import { levels } from "../data/levels";
import { LevelTypes } from "../types/LevelTypes";


export class LevelManager {
    private levelData!: LevelTypes;  // Dữ liệu cấp độ hiện tại

    constructor(levelId: number) {
        this.loadLevel(levelId);
    }

    // Phương thức để nạp dữ liệu cấp độ từ levels.ts
    loadLevel(levelId: number) {
        // Tìm cấp độ dựa trên ID
        const selectedLevel = levels.find(level => level.id === levelId);
        if (selectedLevel) {
            // Gán dữ liệu vào levelData
            this.levelData = selectedLevel as LevelTypes;
        } else {
            throw new Error('Level not found!');
        }
    }

    // Truy cập vào dữ liệu của cấp độ hiện tại
    getLevelData(): LevelTypes {
        return this.levelData;
    }
}
