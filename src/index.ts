import { AnimatedSprite, Application, Assets, } from 'pixi.js';
import { Game } from './game';
import { GameScene } from './scenes/GameScene';
import bundles from '../assets/assetBundle.json';
import AssetLoad from './utils/AssetLoad';

(async () => {
    const app = new Application();
    await app.init({
        background: '#1099bb',
        width: 1024, height: 800,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });
    document.body.appendChild(app.canvas);


    await Assets.init({ manifest: { bundles } });
    await Assets.loadBundle('load-atlas');

    //load atlas
    await AssetLoad.loadAtlas([
        './atlas/towers_atlas.json',
        './atlas/projectiles_atlas.json'
    ]);

    const game = new GameScene(app, 1);
    app.stage.addChild(game);

})();


