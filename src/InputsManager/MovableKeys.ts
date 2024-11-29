import { IDirection } from "../utils/import";
import { Command } from "./Commands/Command";
import { MoveCommandFactory } from "./Commands/MoveCommandFactory";
import { Game } from "../Game";
import { Controller } from "./Controllers";

type IMoveCommand = {
  [key in IDirection]: Command;
};

const directions: IDirection[] = [
  "up",
  "left",
  "right",
  "down",
  "upRight",
  "upLeft",
  "downRight",
  "downLeft",
] as const;

export class MovableKeys {
  game: Game;
  controller: Controller;
  moveCommand: IMoveCommand;

  constructor(game: Game, controller: Controller) {
    this.game = game;
    this.controller = controller;
    const commandFactory = new MoveCommandFactory(game);
    this.moveCommand = {} as IMoveCommand;
    directions.forEach((direction) => {
      this.controller.commands.push(
        commandFactory.getCommandForDirection(direction)
      );
      this.moveCommand[direction] =
        commandFactory.getCommandForDirection(direction);
    });
  }
}
