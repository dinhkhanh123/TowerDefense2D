import { Container, Text, Graphics } from 'pixi.js';
import { EventHandle } from '../../utils/EventHandle';
import { Game } from '../../game';

export class ResultPannel extends Container {
    private background: Graphics;
    private resultText: Text;
    private scoreText: Text;
    private retryButton: Graphics;
    private exitButton: Graphics;


    constructor(isWin: boolean) {
        super();


        // Tạo background cho bảng kết quả
        this.background = new Graphics();
        this.background.fill(0x000000);
        this.background.rect(0, 0, 400, 300); // Kích thước 400x300
        this.background.alpha = 0.8;
        this.background.x = 300;
        this.background.y = 200;
        this.background.pivot.set(.5);
        this.addChild(this.background);

        // Tạo Text hiển thị kết quả (Win/Lose)
        const resultMessage = isWin ? "You Win!" : "Game Over";
        this.resultText = new Text(resultMessage, { fontSize: 36, fill: 0xffffff });
        this.resultText.anchor.set(0.5);
        this.resultText.x = this.background.x + 200;
        this.resultText.y = this.background.y + 50;
        this.addChild(this.resultText);

        // Hiển thị số điểm
        this.scoreText = new Text(`Score: 3 sao`, { fontSize: 24, fill: 0xffffff });
        this.scoreText.anchor.set(0.5);
        this.scoreText.x = this.background.x + 200;
        this.scoreText.y = this.background.y + 120;
        this.addChild(this.scoreText);

        // Nút "Retry"
        this.retryButton = new Graphics();
        this.retryButton.beginFill(0x00FF00); // Màu xanh lá cây
        this.retryButton.drawRoundedRect(0, 0, 150, 50, 10); // Kích thước 150x50
        this.retryButton.endFill();
        this.retryButton.x = this.background.x + 50;
        this.retryButton.y = this.background.y + 200;
        this.retryButton.interactive = true;
        this.retryButton.eventMode = 'static';
        this.retryButton.on('pointerdown', this.onRetry);
        this.addChild(this.retryButton);

        const retryText = new Text("Retry", { fontSize: 20, fill: 0xffffff });
        retryText.anchor.set(0.5);
        retryText.x = this.retryButton.x + 75;
        retryText.y = this.retryButton.y + 25;
        this.addChild(retryText);

        // Nút "Exit"
        this.exitButton = new Graphics();
        this.exitButton.fill(0xFF0000); // Màu đỏ
        this.exitButton.rect(0, 0, 150, 50); // Kích thước 150x50
        this.exitButton.x = this.background.x + 210;
        this.exitButton.y = this.background.y + 200;
        this.exitButton.interactive = true;
        this.exitButton.eventMode = 'static';
        this.exitButton.on('pointerdown', this.onExit);
        this.addChild(this.exitButton);

        const exitText = new Text("Exit", { fontSize: 20, fill: 0xffffff });
        exitText.anchor.set(0.5);
        exitText.x = this.exitButton.x + 75;
        exitText.y = this.exitButton.y + 25;
        this.addChild(exitText);
    }

    private onRetry = () => {
        console.log('Retry clicked');
        Game.instance.reloadGameScene();
    };

    private onExit = () => {
        // Logic để thoát game hoặc quay lại menu chính
        console.log("Exit clicked");
        this.emit("exit"); // Gửi sự kiện exit để GameScene lắng nghe
    };
}
