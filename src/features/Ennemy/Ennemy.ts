import { Vector3 } from "@babylonjs/core";
import { Game } from "../../Game";
import { IModel } from "../../shared/Models/interface";
import { Units } from "../../shared/GameObject/Units/Units";

interface EnnemyState {
  isIntersectionPlayer: boolean;
}

export class Ennemy extends Units {
  private state: EnnemyState;
  private moveOberserver: any;
  constructor(model: IModel, game: Game, initPosition: Vector3) {
    super(model, game);
    this.state = {
      isIntersectionPlayer: false,
    };
    this.model.setPosition(initPosition);
    setTimeout(() => {
      this.move();
    }, 100);
  }

  getState() {
    return this.state;
  }

  public move() {
    this.moveOberserver = this.game
      .getScene()
      .onBeforeRenderObservable.add(() => {
        this.state.isIntersectionPlayer = this.model
          .getRoot()
          .intersectsMesh(this.game.getPlayer().model.getRoot(), false);
        const distanceToPlayer = this.model
          .getPosition()
          .subtract(this.game.getPlayer().model.getPosition());
        if (this.getState().isIntersectionPlayer) {
          this.getMovingState().setIsMoving(false);
          if (!this.game.getPlayer().getState().isInvincible) {
            this.game
              .getPlayer()
              .takeDamage(this.getStatistical().attack_damage);
          }
          return;
        }
        this.getMovingState().setIsMoving(true);
        const targetVectorNorm = Vector3.Normalize(distanceToPlayer);
        this.model.setPosition(
          this.model
            .getPosition()
            .subtract(targetVectorNorm.scale(this.getStatistical().moveSpeed))
        );
      });
  }

  public takeDamage(damage: number) {
    this.getStatistical().hp -= damage;
    if (this.getStatistical().hp <= 0) {
      this.game.getEnnemySpawner().getEnnemyDeadObserver().notify(this);
      this.model.getRoot().dispose();
      this.moveOberserver.remove();
    }
  }

  getIsIntersectionPlayer() {
    return this.getState().isIntersectionPlayer;
  }

  getId() {
    return this.id;
  }
}
