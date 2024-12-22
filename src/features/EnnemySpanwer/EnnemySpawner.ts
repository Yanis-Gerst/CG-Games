import { Vector3 } from "@babylonjs/core";
import { Game } from "../../Game";
import { TestEnnemy } from "../Ennemy/TestEnnemy/TestEnnemy";
import { Ennemy } from "../Ennemy/Ennemy";
import { ObservableProvider } from "../../shared/Observable/Observable";

export class EnnemySpawner {
  private game: Game;
  private ennemies: Ennemy[];
  private ennemyDeadObserver: ObservableProvider;
  constructor(game: Game) {
    this.game = game;
    this.ennemies = [];
    this.ennemyDeadObserver = new ObservableProvider();
    this.setupEnnemyLifeCycle();
    this.setupEnnemieReward();
  }

  setupEnnemyLifeCycle() {
    this.getEnnemyDeadObserver().subscribe((deadEnnemy: Ennemy) => {
      console.log("Ennemy dead", deadEnnemy.getId());
      this.setEnnemies(
        this.getEnnemies().filter(
          (ennemy) => ennemy.getId() !== deadEnnemy.getId()
        )
      );
    });
  }

  setupEnnemieReward() {
    this.getEnnemyDeadObserver().subscribe((ennemy: Ennemy) => {
      this.game
        .getPlayer()
        .getLevelSystem()
        .gainXp(10 * ennemy.getStatistical().maxHp * 10);
    });
  }

  spawnEnnemy(wave: number) {
    let waveTime = 30;
    const spawningIntervals = 5;

    const interval = setInterval(() => {
      if (waveTime <= 0) {
        clearInterval(interval);
        return;
      }
      for (let i = 0; i < wave; i++) {
        waveTime -= spawningIntervals;
        const randomPosition = new Vector3(
          Math.random() * 100,
          this.game.getPlayer().model.getPosition().y,
          Math.random() * 100
        );
        const ennemy = new TestEnnemy(this.game, randomPosition);
        this.getEnnemies().push(ennemy);
        console.log(`${wave} Ennemy spawned`);
      }
    }, spawningIntervals * 1000);
  }

  getEnnemies() {
    return this.ennemies;
  }

  getEnnemyDeadObserver() {
    return this.ennemyDeadObserver;
  }

  setEnnemies(ennemies: Ennemy[]) {
    this.ennemies = ennemies;
  }
}
