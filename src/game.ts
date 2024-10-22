import { Application } from 'pixi.js';
import { GameScene } from './scenes/GameScene';
// import { MainMenu } from './scenes/MainMenu';
// import { GameScene } from './scenes/GameScene';
// import { GameOver } from './scenes/GameOver';

export class Game {
    private app: Application;
    private currentScene: any;

    constructor(app: Application) {
        this.app = app;
    }

    // Bắt đầu game
    start(): void {
        //this.loadMainMenu();
        this.loadGameScene();
    }

    // Chuyển đổi sang scene MainMenu
    // private loadMainMenu(): void {
    //     this.cleanUpCurrentScene();
    //     this.currentScene = new MainMenu(this.app);
    //     this.currentScene.start();
    // }

    // Chuyển đổi sang scene GameScene
    loadGameScene(): void {
        this.cleanUpCurrentScene();
        this.currentScene = new GameScene(1);
        this.app.ticker.add(time => {
            this.currentScene.update(time.deltaTime);
        });
        this.currentScene.start();
    }

    // Chuyển đổi sang scene GameOver
    // loadGameOver(): void {
    //     this.cleanUpCurrentScene();
    //     this.currentScene = new GameOver(this.app);
    //     this.currentScene.start();
    // }

    // Xóa các scene hiện tại khi thay đổi
    private cleanUpCurrentScene(): void {
        if (this.currentScene) {
            this.currentScene.destroy();
            this.app.stage.removeChildren();
        }
    }
}
