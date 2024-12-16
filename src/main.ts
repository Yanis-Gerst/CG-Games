import "./style.css";
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
import { Game } from "./Game";
registerBuiltInLoaders();

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
if (!canvas)
  throw new Error("Need to create an cava element the id renderCanvas");

const game = new Game(canvas);

await game.init();
