import "./style.css";
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
import {
  createGameHTML,
  initGameAndHandleUI,
} from "./title-screen/title-screen";
registerBuiltInLoaders();

const button = document.querySelector("#game-btn") as HTMLButtonElement;
if (!button) throw new Error("need a game-btn");
button?.addEventListener("click", () => {
  createGameHTML();
  initGameAndHandleUI();
});
