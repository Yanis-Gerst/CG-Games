import "./style.css";
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
import { Game } from "./Game";
registerBuiltInLoaders();

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const health = document.getElementById("health") as HTMLDivElement;
const xp = document.getElementById("xp") as HTMLDivElement;
const levelDisplay = document.getElementById("levelDisplay") as HTMLDivElement;
if (!canvas)
  throw new Error("Need to create an cava element the id renderCanvas");

const game = new Game(canvas);

await game.init();

game.getScene().onBeforeRenderObservable.add(() => {
  const percentage =
    (game.getPlayer().getStatistical().hp /
      game.getPlayer().getStatistical().maxHp) *
    100;
  health.style.width = `${percentage}%`;
});

game.getScene().onBeforeRenderObservable.add(() => {
  const percentage =
    (game.getPlayer().getLevelSystem().getXp() /
      game.getPlayer().getLevelSystem().getMaxXp()) *
    100;
  xp.style.width = `${percentage}%`;
  levelDisplay.innerHTML = `Level: ${game
    .getPlayer()
    .getLevelSystem()
    .getLevel()}`;
});
