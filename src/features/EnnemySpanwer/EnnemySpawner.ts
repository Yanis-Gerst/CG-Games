import { Vector3 } from "@babylonjs/core";
import { TestEnnemy } from "../Ennemy/TestEnnemy/TestEnnemy";
import { Ennemy } from "../Ennemy/Ennemy";
import { ObservableProvider } from "../../shared/Observable/Observable";
import { XpMaterialsSpawner } from "../Collectible/XpMaterialsSpawner";
import { Game } from "../../Game";

export type IWaveConfig = {
  spawnInterval: number;
  waveTime: number;
};

export class EnnemySpawner {
  private game: Game;
  private ennemies: Ennemy[];
  private ennemyDeadObserver: ObservableProvider;
  private xpMaterialsSpawner: XpMaterialsSpawner;
  private wave: number;
  private waveConfig: IWaveConfig;
  private isPlaying = true;
  private waveObersvable = new ObservableProvider();

  constructor(game: Game) {
    this.game = game;
    this.ennemies = [];
    this.wave = 1;
    this.ennemyDeadObserver = new ObservableProvider();
    this.setupEnnemyLifeCycle();
    this.xpMaterialsSpawner = new XpMaterialsSpawner(this.game);
    this.xpMaterialsSpawner.setupXpSpwanOnDeadOf(this.getEnnemyDeadObserver());
    this.waveConfig = {
      waveTime: 30,
      spawnInterval: 5,
    };
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

  startWave() {
    let currentWaveTime = this.getWaveConfig().waveTime;

    const intervalObserver = this.game.renderLoop.setIntervalOnFrame(() => {
      if (currentWaveTime <= 0) {
        intervalObserver.remove();
        if (this.isPlaying) this.nextWave();
        return;
      }
      currentWaveTime -= this.getWaveConfig().spawnInterval;
      for (let i = 0; i < this.getWave(); i++) {
        this.spawnEnnemieInRandomPosition();
      }
    }, this.getWaveConfig().spawnInterval * 1000);
  }

  nextWave() {
    this.setWave(this.getWave() + 1);
    this.game.renderLoop.setTimeoutOnFrame(() => {
      this.waveObersvable.notify(this.getWave());
      console.log("Wave ", this.getWave());
      this.startWave();
    }, 1000);
  }

  spawnEnnemieInRandomPosition() {
    const randomPosition = new Vector3(
      Math.random() * 20,
      this.game.getPlayer().model.getPosition().y,
      Math.random() * 20
    );
    const ennemy = new TestEnnemy(this.game, randomPosition);
    this.getEnnemies().push(ennemy);
  }

  getWaveObservable() {
    return this.waveObersvable;
  }
  getEnnemies() {
    return this.ennemies;
  }

  getEnnemyDeadObserver() {
    return this.ennemyDeadObserver;
  }

  getWave() {
    return this.wave;
  }

  getWaveConfig() {
    return this.waveConfig;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  setIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying;
  }

  setWave(wave: number) {
    this.wave = wave;
  }

  setEnnemies(ennemies: Ennemy[]) {
    this.ennemies = ennemies;
  }
}
