import { Game } from "../../Game";
import { PauseCommand } from "./PauseCommand";

export class RenderLoop {
  private pause: boolean = false;
  private game: Game;
  private FPSLIMIT = 60;

  constructor(Game: Game) {
    this.game = Game;
  }

  start() {
    this.setupPauseKey();
    let accumulatorToCap60FPS = 0;
    this.game.engine.runRenderLoop(() => {
      if (this.pause) return;
      accumulatorToCap60FPS += this.game.engine.getDeltaTime();
      if (accumulatorToCap60FPS < 100 / this.FPSLIMIT) return;
      accumulatorToCap60FPS = 0;
      this.game.scene.render();
    });
    window.addEventListener("resize", () => {
      this.game.engine.resize();
    });
  }

  setTimeoutOnFrame(cb: Function, timeInMs: number) {
    const triggerOnFrame = this.msToFrame(timeInMs);
    let frameCounter = 0;
    const frameCounterObserver = this.game.scene.onBeforeRenderObservable.add(
      () => {
        frameCounter++;
        if (frameCounter < triggerOnFrame) return;
        cb();
        frameCounterObserver.remove();
      }
    );
  }

  setIntervalOnFrame(cb: Function, timeInMs: number) {
    const triggerOnFrame = this.msToFrame(timeInMs);
    let frameCounter = 0;
    const frameCounterObserver = this.game.scene.onBeforeRenderObservable.add(
      () => {
        frameCounter++;
        if (frameCounter < triggerOnFrame) return;
        cb();
        frameCounter = 0;
      }
    );
    return frameCounterObserver;
  }

  private msToFrame(timeInMs: number) {
    const timeInSecond = timeInMs / 1000;

    return Math.floor(timeInSecond * this.FPSLIMIT);
  }

  setupPauseKey() {
    console.log("SetupKey");
    const pauseCommand = new PauseCommand(this.game);
    this.game.getGlobalController().commands.push(pauseCommand);
  }

  getPaused() {
    return this.pause;
  }

  setPaused(paused: boolean) {
    this.pause = paused;
  }
}
