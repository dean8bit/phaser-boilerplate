import "phaser";
export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  public init(): void {}
  public preload(): void {}
  public create(): void {
    this.scene.start("GameScene");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: number, _delta: number): void {}
}
