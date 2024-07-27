import "phaser";
import Test from "../components/Test";

export class GameScene extends Phaser.Scene {
  public test?: Test;
  constructor() {
    super("GameScene");
  }

  public init(): void {}
  public preload(): void {}
  public create(): void {
    const testSprite = new Phaser.GameObjects.Sprite(
      this,
      this.renderer.width / 2,
      this.renderer.height / 2,
      "logo"
    );
    this.add.existing(testSprite);
    new Test(testSprite, true);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: number, _delta: number): void {}
}
