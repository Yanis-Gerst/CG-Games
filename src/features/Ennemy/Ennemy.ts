import { ISceneLoaderAsyncResult, Vector3 } from "@babylonjs/core";
import { GameObject } from "../../shared/GameObject";
import { Game } from "../../Game";

export class Ennemy extends GameObject {
  private hp: number;
  private moveSpeed: number;
  private attack: number;
  private distanceToPlayer: Vector3;
  constructor(model: ISceneLoaderAsyncResult, game: Game) {
    super(model, game);
    this.hp = 100;
    this.moveSpeed = 0.2;
    this.attack = 10;
    this.distanceToPlayer = this.root.position.subtract(
      this.game.getPlayer().root.position
    );

    this.root.position = new Vector3(
      15,
      this.game.getPlayer().root.position.y,
      15
    );

    this.move();
  }

  public move() {
    this.game.getScene().onBeforeRenderObservable.add(() => {
      this.distanceToPlayer = this.root.position.subtract(
        this.game.getPlayer().root.position
      );
      const distanceVec = Vector3.Distance(
        this.distanceToPlayer,
        this.root.position
      );
      if (distanceVec <= 0) return;
      const targetVectorNorm = Vector3.Normalize(this.distanceToPlayer);
      this.root.position = this.root.position.subtract(
        targetVectorNorm.scale(this.moveSpeed)
      );
    });
  }
}
