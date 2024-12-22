import { Game } from "../../Game";
import { PlayableCharacter } from "./PlayableCharacter";

export class LevelSystem {
  private game: Game;
  private player: PlayableCharacter;
  private level: number;
  private xp: number;
  private maxXp: number;

  constructor(game: Game, player: PlayableCharacter) {
    this.game = game;
    this.player = player;
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
    this.player.getStatistical().maxHp += 10;
    this.player.getStatistical().attack_damage += 1;
    this.player.getStatistical().moveSpeed += 0.1;
    this.player.getStatistical().defense += 1;
    this.player.getStatistical().criticalChance += 0.1;
    this.player.getStatistical().criticalDamage += 1;
    this.player.getStatistical().dodge += 0.1;
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
