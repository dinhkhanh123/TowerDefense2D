import { Application } from 'pixi.js';
import { GameScene } from './scenes/GameScene';
import { EventHandle } from './utils/EventHandle';


export class Game {
    public static instance: Game;
    private app: Application;

    constructor(app: Application) {
        Game.instance = this;
        this.app = app;

    }

    // Bắt đầu game
    start(): void {
        this.loadGameScene();
    }

    // Chuyển đổi sang scene GameScene
    loadGameScene(): void {
        const currentScene = new GameScene(1);
        this.app.ticker.add(time => {
            currentScene.update(time.deltaTime);
        });
        this.app.stage.addChild(currentScene);
    }

    reloadGameScene(): void {
        this.app.stage.removeChildren(0);
        this.loadGameScene();
    }

}
