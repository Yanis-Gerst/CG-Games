import { Game } from "../../Game";
import { IWeapon } from "../Weapon/Weapon";

export class Inventory {
  private game: Game;
  private weapon: IWeapon[];

  constructor(game: Game) {
    this.game = game;
    this.weapon = [];
  }

  activateWeapon() {
    this.weapon.forEach((weapon) => weapon.activate());
  }

  deactivateWeapon() {
    this.weapon.forEach((weapon) => weapon.deactivate());
  }

  getWeapon() {
    return this.weapon;
  }

  getGame() {
    return this.game;
  }
}
