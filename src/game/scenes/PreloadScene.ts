import "phaser";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  public init(): void {}
  public preload(): void {
    this.load.image("logo", "content/test.png");
    this.load.on(Phaser.Loader.Events.COMPLETE, () =>
      this.scene.start("MenuScene")
    );
  }
  public create(): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: number, _delta: number): void {}
}
