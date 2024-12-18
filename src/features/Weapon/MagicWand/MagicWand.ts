import { Game } from "../../../Game";
import { Ennemy } from "../../Ennemy/Ennemy";
import { IWeapon, Weapon } from "../Weapon";
import { magicWandBaseStats } from "./MagicWandBaseStats";

export class MagicWand extends Weapon implements IWeapon {
  constructor(game: Game) {
    super(game, "Magic Wand");
    this.getWeaponStatistical().setStatistical(magicWandBaseStats);
  }

  getTheClosestEnnemy() {
    const ennemies = this.ennemyInRange();
    if (ennemies.length === 0) return null;
    let closestEnnemy = ennemies[0];
    ennemies.forEach((ennemy) => {
      if (
        this.getDistanceToPlayer(ennemy.model.getPosition()) <
        this.getDistanceToPlayer(closestEnnemy.model.getPosition())
      ) {
        closestEnnemy = ennemy;
      }
    });
    return closestEnnemy;
  }

  public activate() {
    this.setWeaponObserver(
      this.getGame()
        .getScene()
        .onBeforeRenderObservable.add(() => {
          if (this.getState().onColdown) return;
          const closestEnnemy = this.getTheClosestEnnemy();
          if (closestEnnemy === null) return;
          this.getState().onColdown = true;
          setTimeout(() => {
            this.getState().onColdown = false;
          }, this.getWeaponStatistical().getCooldown());
          this.attack(closestEnnemy);
        })
    );
  }

  public deactivate() {
    this.getWeaponObserver()?.remove();
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
  }
}
