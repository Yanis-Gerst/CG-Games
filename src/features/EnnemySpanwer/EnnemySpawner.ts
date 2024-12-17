import { Vector3 } from "@babylonjs/core";
import { Game } from "../../Game";
import { TestEnnemy } from "../Ennemy/ennemies/TestEnnemy";

export class EnnemySpawner {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
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
        this.game.getEnnemy().push(ennemy);
        console.log(this.game.getEnnemy());
      }
    }, spawningIntervals * 1000);
  }
}
