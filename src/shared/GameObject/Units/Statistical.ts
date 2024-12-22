import { Weapon } from "../../../features/Weapon/Weapon";

export interface IStatistical {
  maxHp: number;
  hp: number;
  attack_damage: number;
  moveSpeed: number;
  defense: number;
  criticalChance: number;
  criticalDamage: number;
  dodge: number;
}

export const baseStatistical: IStatistical = {
  maxHp: 1,
  hp: 1,
  attack_damage: 1,
  moveSpeed: 0.1,
  defense: 0,
  criticalChance: 0,
  criticalDamage: 0,
  dodge: 0,
};

export class Statistical implements IStatistical {
  public maxHp: number = 1;
  public hp: number = 1;
  public attack_damage: number = 1;
  public moveSpeed: number = 0.1;
  public defense: number = 0;
  public criticalChance: number = 0;
  public criticalDamage: number = 0;
  public dodge: number = 0;

  setStatistical(statistical: IStatistical) {
    this.maxHp = statistical.maxHp;
    this.hp = statistical.hp;
    this.attack_damage = statistical.attack_damage;
    this.moveSpeed = statistical.moveSpeed;
    this.defense = statistical.defense;
    this.criticalChance = statistical.criticalChance;
    this.criticalDamage = statistical.criticalDamage;
    this.dodge = statistical.dodge;
  }

  getDamageAttack(weapon: Weapon) {
    const damage = this.attack_damage * weapon.getDamage();
    if (this.isCritical()) {
      return damage * this.criticalDamage;
    }
    return damage;
  }
  isCritical() {
    return Math.random() < this.criticalChance;
  }

  isDodge() {
    return Math.random() < this.dodge;
  }
}
