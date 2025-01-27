import { Observer, Scene } from "@babylonjs/core";
import { Ennemy } from "../Ennemy/Ennemy";
import { WeaponStatistical } from "./WeaponStatistical";
import { DisplayDamage } from "./DisplayDamage";
import { Game } from "../../Game";

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
  private displayDamage: DisplayDamage;
  constructor(game: Game, name: string) {
    this.game = game;
    this.name = name;
    this.weaponStatistical = new WeaponStatistical();
    this.state = {
      onColdown: false,
    };
    this.displayDamage = new DisplayDamage(game);
  }
  public attack(ennemy: Ennemy) {
    const dmg = this.getGame()
      .getPlayer()
      .getStatistical()
      .getDamageAttack(this);
    console.log(
      `Attack with ${this.getName()} on ${ennemy.getId()} do ${dmg} damage`
    );
    ennemy.takeDamage(dmg);
    this.displayDamage.displayDamage(dmg, ennemy.model.getPosition());
  }

  protected ennemyInRange(): Ennemy[] {
    return this.getGame()
      .getEnnemySpawner()
      .getEnnemies()
      .filter(
        (ennemy) =>
          this.game
            .getPlayer()
            .getDistanceToPlayer(ennemy.model.getPosition()) <=
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
