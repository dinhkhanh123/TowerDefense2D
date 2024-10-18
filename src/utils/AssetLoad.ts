import { Assets, Texture } from 'pixi.js';

export default class AssetLoad {
    static texture: Record<string, Texture> = {};
    static animations: Record<string, any> = {};
    static sounds: Record<string, HTMLAudioElement> = {};

    // Hàm để load các file atlas JSON và lưu các texture
    static async loadAtlas(atlasFiles: string[]) {
        for (const atlasFile of atlasFiles) {
            const atlas = await Assets.load(atlasFile);
            const textureNames = Object.keys(atlas.textures);

            textureNames.forEach(name => {
                AssetLoad.texture[name] = atlas.textures[name];
            });
        }
    }

    static async loadBitmap(bitmapFiles: string[]) {
        for (const bitmapFile of bitmapFiles) {
            await Assets.load(bitmapFile);
        }
    }

    static async loadSoundSprite(soundJsonPath: string) {
        await Assets.load({ alias: "game-sound", src: soundJsonPath });
    }

    static async loadAnimations(animationFiles: string[]) {
        for (const animationFile of animationFiles) {
            const data = await Assets.load(animationFile);

            Object.keys(data.animations).forEach(animationName => {
                if (!AssetLoad.animations[animationName]) {
                    AssetLoad.animations[animationName] = data.animations[animationName];
                } else {
                    console.warn(`Animation ${animationName} already exists. Skipping.`);
                }
            });
        }
    }

    // Hàm để lấy texture theo tên
    static getTexture(name: string): Texture {
        const texture = this.texture[name];
        if (!texture) {
            throw new Error(`Texture ${name} not found in atlas.`);
        }
        return texture;
    }

    // Hàm để lấy animation theo tên
    static getAnimation(name: string) {
        const animation = this.animations[name];
        if (!animation) {
            throw new Error(`Animation ${name} not found.`);
        }
        return animation;
    }
}