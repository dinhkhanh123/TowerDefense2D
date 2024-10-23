import { Application } from "pixi.js";
import { GameScene } from "./GameScene";

export class MapScene {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    // Giả sử có hàm này để chọn map
    selectMap(mapId: number) {
        // Chuyển đến GameScene với mapId
        this.loadGame(mapId);
    }

    loadGame(mapId: number) {
        const gameScene = new GameScene(mapId);
        this.app.stage.removeChildren(); // Xoá các scene hiện tại
        this.app.stage.addChild(gameScene);
        this.app.ticker.add(time => {
            gameScene.update(time.deltaTime);
        });
    }
}
