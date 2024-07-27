import "phaser";

export default class Component<T extends Phaser.GameObjects.GameObject> {
  public readonly gameObject: T;

  public static getComponents<
    T extends Component<Phaser.GameObjects.GameObject>
  >(
    gameObject: Phaser.GameObjects.GameObject,
    typeConstructor: new (...args: any[]) => T
  ): T[] {
    return (gameObject as any).components
      ? ((
          (gameObject as any)
            .components as Component<Phaser.GameObjects.GameObject>[]
        ).filter((c) => c instanceof typeConstructor) as T[])
      : [];
  }

  constructor(gameObject: T, updateHook: boolean) {
    this.gameObject = gameObject;
    this.init();
    this.add();
    this.hooks(updateHook);
  }

  private init() {
    if (!(this.gameObject as any).components) {
      (this.gameObject as any).components = [];
    }
  }

  private add() {
    (this.gameObject as any).components.push(this);
  }

  private hooks(updateHook: boolean) {
    this.gameObject.scene.events.once(
      Phaser.Scenes.Events.UPDATE,
      this.tryOnStart,
      this
    );

    if (updateHook)
      this.gameObject.scene.events.on(
        Phaser.Scenes.Events.UPDATE,
        this.tryOnUpdate,
        this
      );

    this.gameObject.on(
      Phaser.GameObjects.Events.DESTROY,
      this.tryOnDestroy,
      this
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onStart(): void {}

  private tryOnStart(): void {
    this.tryCall(this.onStart);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onUpdate(): void {}

  private tryOnUpdate(): void {
    this.tryCall(this.onUpdate);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onDestroy(): void {}

  private tryOnDestroy(): void {
    this.gameObject.scene.events.off(
      Phaser.Scenes.Events.UPDATE,
      this.tryOnStart,
      this
    );
    this.gameObject.scene.events.off(
      Phaser.Scenes.Events.UPDATE,
      this.tryOnUpdate,
      this
    );
    this.gameObject.off(
      Phaser.GameObjects.Events.DESTROY,
      this.tryOnDestroy,
      this
    );
    this.tryCall(this.onDestroy);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const components = (this.gameObject as any).components;
    const index = components.indexOf(this);
    if (index !== -1) {
      components.splice(index, 1);
    }
  }

  public destroy(): void {
    this.tryOnDestroy();
  }

  private tryCall(f: () => void) {
    try {
      f.call(this);
    } catch (error: any) {
      console.error(`(${this.gameObject.name}) ERROR: ${error.stack}`);
    }
  }
}
