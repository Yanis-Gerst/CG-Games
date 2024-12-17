import { Vector3 } from "@babylonjs/core";
import { Game } from "../../Game";
import { Ennemy } from "../Ennemy/Ennemy";

export class Weapon {
  private game: Game;
  private range: number;
  private damage: number;
  private cooldown: number;
  private onColdown = false;

  constructor(game: Game) {
    this.game = game;
    this.range = 10;
    this.damage = 30;
    this.cooldown = 1000;
  }

  public ennemyInRange(): Ennemy[] {
    return this.game
      .getEnnemy()
      .filter(
        (ennemy) =>
          Math.abs(
            Vector3.Distance(
              this.game.getPlayer().model.getPosition(),
              ennemy.model.getPosition()
            )
          ) <= this.range
      );
  }

  public activate() {
    this.game.getScene().onBeforeRenderObservable.add(() => {
      if (this.onColdown) return;
      const ennemies = this.ennemyInRange();
      if (ennemies.length === 0) return;
      this.onColdown = true;
      setTimeout(() => {
        this.onColdown = false;
      }, this.cooldown);
      this.attack(ennemies[0]);
    });
  }

  public attack(ennemy: Ennemy) {
    ennemy.takeDamage(this.damage);
  }
}
