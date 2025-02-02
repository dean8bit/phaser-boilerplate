import "phaser";
import { PreloadScene } from "./scenes/PreloadScene";
import { MenuScene } from "./scenes/MenuScene";
import { GameScene } from "./scenes/GameScene";

export interface IConfig {
  type: number;
  width: number;
  height: number;
  backgroundColor: string;
  pixelArt: boolean;
  scale: {
    mode: Phaser.Scale.ScaleModes;
    autoCenter: Phaser.Scale.Center;
  };
  scene: (typeof Phaser.Scene)[];
  parent: string;
}

export const config: IConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  backgroundColor: "#000000",
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.ScaleModes.ENVELOP,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },
  scene: [PreloadScene, MenuScene, GameScene],
  parent: "game",
};

export const createGame = () => new Phaser.Game(config);
