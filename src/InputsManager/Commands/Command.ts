import { Game } from "../../Game";
import { Controller } from "../Controllers";
import { ICommand } from "../interface";

export class Command implements ICommand {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  execute() {
    return;
  }

  finish() {
    return;
  }

  condition(_controller: Controller): boolean {
    return false;
  }
}
