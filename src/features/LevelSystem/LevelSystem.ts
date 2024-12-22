import { Units } from "../../shared/GameObject/Units/Units";

export class LevelSystem {
  private unit: Units;
  private level: number;
  private xp: number;
  private maxXp: number;

  constructor(unit: Units) {
    this.unit = unit;
    this.level = 1;
    this.xp = 0;
    this.maxXp = 100;
  }

  gainXp(xpGained: number) {
    this.xp += xpGained;
    if (this.xp >= this.maxXp) {
      const xpLeft = this.xp - this.maxXp;
      console.log("xpLeft", xpLeft);
      this.levelUp();
      if (xpLeft <= 0) return;
      this.gainXp(xpLeft);
    }
  }

  levelUp() {
    this.level++;
    this.xp = 0;
    this.maxXp = this.getMaxXpFormula();
    this.unit.getStatistical().maxHp += 10;
    this.unit.getStatistical().attack_damage += 1;
    this.unit.getStatistical().moveSpeed += 0.1;
    this.unit.getStatistical().defense += 1;
    this.unit.getStatistical().criticalChance += 0.1;
    this.unit.getStatistical().criticalDamage += 1;
    this.unit.getStatistical().dodge += 0.1;
  }

  getMaxXpFormula() {
    return this.level * 100;
  }

  getLevel() {
    return this.level;
  }

  getXp() {
    return this.xp;
  }

  getMaxXp() {
    return this.maxXp;
  }
}
