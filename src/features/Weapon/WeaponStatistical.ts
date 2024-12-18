export type IWeaponStatistical = {
  damage: number;
  range: number;
  cooldown: number;
};

export class WeaponStatistical {
  damage: number;
  range: number;
  cooldown: number;

  constructor() {
    this.damage = 1;
    this.range = 10;
    this.cooldown = 1000;
  }

  setStatistical(stats: IWeaponStatistical) {
    this.damage = stats.damage;
    this.range = stats.range;
    this.cooldown = stats.cooldown;
  }

  getDamage() {
    return this.damage;
  }

  getRange() {
    return this.range;
  }

  getCooldown() {
    return this.cooldown;
  }
}
