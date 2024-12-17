import { AbstractMesh, Vector3 } from "@babylonjs/core";
import { GameObject } from "../../shared/GameObject/GameObject";
import { Game } from "../../Game";
import { IModel } from "../../shared/Models/interface";
import { MovingState } from "../../shared/GameObject/MovingState";

export class Ennemy extends GameObject {
  private static id = 0;
  private id: number;
  private hp: number;
  private moveSpeed: number;
  private attack: number;
  private isIntersectionPlayer = false;
  private moveOberserver: any;
  private movingState: MovingState;
  constructor(model: IModel, game: Game, initPosition: Vector3) {
    super(model, game);
    this.hp = 100;
    this.moveSpeed = 0.2;
    this.attack = 10;
    this.id = Ennemy.id++;
    this.model.setPosition(initPosition);
    this.movingState = new MovingState();
    setTimeout(() => {
      this.move();
    }, 100);
  }

  public move() {
    this.moveOberserver = this.game
      .getScene()
      .onBeforeRenderObservable.add(() => {
        this.isIntersectionPlayer = this.model
          .getRoot()
          .intersectsMesh(this.game.getPlayer().model.getRoot(), false);
        const distanceToPlayer = this.model
          .getPosition()
          .subtract(this.game.getPlayer().model.getPosition());
        if (this.isIntersectionPlayer) {
          this.movingState.setIsMoving(false);
          if (!this.game.getPlayer().isInvincible) {
            this.game.getPlayer().takeDamage(this.attack);
          }
          return;
        }
        this.movingState.setIsMoving(true);
        const targetVectorNorm = Vector3.Normalize(distanceToPlayer);
        this.model.setPosition(
          this.model
            .getPosition()
            .subtract(targetVectorNorm.scale(this.moveSpeed))
        );
      });
  }

  public takeDamage(damage: number) {
    this.hp -= damage;
    console.log(this.hp, "ennemy");
    if (this.hp <= 0) {
      console.log("Finito l'ennemy", this.id);
      this.game.getEnnemy().forEach((ennemy) => console.log(ennemy.getId()));
      this.game.setEnnemy(
        this.game.getEnnemy().filter((ennemy) => ennemy.getId() !== this.id)
      );
      this.model.getRoot().dispose();
      this.moveOberserver.remove();
    }
  }

  getIsIntersectionPlayer() {
    return this.isIntersectionPlayer;
  }

  getId() {
    return this.id;
  }

  getMovingState() {
    return this.movingState;
  }
}
