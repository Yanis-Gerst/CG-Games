import { Observer, Scene, Vector3 } from "@babylonjs/core";
import { Game } from "../../Game";
import { Ennemy } from "../Ennemy/Ennemy";
import { WeaponStatistical } from "./WeaponStatistical";

export interface IWeapon {
  getName(): string;
  getDamage(): number;
  activate(): void;
  attack(ennemy: Ennemy): void;
  deactivate(): void;
}

export type IWeaponState = {
  onColdown: boolean;
};

export class Weapon {
  private name: string;
  private game: Game;
  private weaponStatistical: WeaponStatistical;
  private state: IWeaponState;
  private weaponObserver: Observer<Scene> | null = null;

  constructor(game: Game, name: string) {
    this.game = game;
    this.name = name;
    this.weaponStatistical = new WeaponStatistical();
    this.state = {
      onColdown: false,
    };
  }

  getDistanceToPlayer(position: Vector3) {
    return Math.abs(
      Vector3.Distance(this.getGame().getPlayer().model.getPosition(), position)
    );
  }

  protected ennemyInRange(): Ennemy[] {
    return this.getGame()
      .getEnnemySpawner()
      .getEnnemies()
      .filter(
        (ennemy) =>
          this.getDistanceToPlayer(ennemy.model.getPosition()) <=
          this.getWeaponStatistical().getRange()
      );
  }

  getDamage() {
    return this.weaponStatistical.getDamage();
  }

  getName() {
    return this.name;
  }

  getWeaponStatistical() {
    return this.weaponStatistical;
  }

  getGame() {
    return this.game;
  }

  getState() {
    return this.state;
  }

  getWeaponObserver() {
    return this.weaponObserver;
  }

  setWeaponObserver(observer: Observer<Scene>) {
    this.weaponObserver = observer;
  }
}
