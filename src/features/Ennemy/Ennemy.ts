import { ISceneLoaderAsyncResult, Vector3 } from "@babylonjs/core";
import { GameObject } from "../../shared/GameObject";
import { Game } from "../../Game";

export class Ennemy extends GameObject {
  private hp: number;
  private moveSpeed: number;
  private attack: number;
  private isIntersectionPlayer = false;

  constructor(
    model: ISceneLoaderAsyncResult,
    game: Game,
    initPosition: Vector3
  ) {
    super(model, game);
    this.hp = 100;
    this.moveSpeed = 0.2;
    this.attack = 10;

    this.root.position = initPosition;

    this.root.setBoundingInfo(this.model.meshes[2].getBoundingInfo());

    setTimeout(() => {
      this.move();
    }, 100);
  }

  public move() {
    this.game.getScene().onBeforeRenderObservable.add(() => {
      this.isIntersectionPlayer = this.root.intersectsMesh(
        this.game.getPlayer().root,
        false
      );
      const distanceToPlayer = this.root.position.subtract(
        this.game.getPlayer().root.position
      );

      if (this.isIntersectionPlayer) {
        if (!this.game.getPlayer().isInvincible) {
          this.game.getPlayer().takeDamage(this.attack);
        }
        return;
      }
      const targetVectorNorm = Vector3.Normalize(distanceToPlayer);
      this.root.position = this.root.position.subtract(
        targetVectorNorm.scale(this.moveSpeed)
      );
    });
  }
}
