import { Component } from "../Component";

export default class Test extends Component<Phaser.GameObjects.GameObject> {
  public onStart(): void {}

  public onUpdate(): void {
    console.log("update");
  }
}
