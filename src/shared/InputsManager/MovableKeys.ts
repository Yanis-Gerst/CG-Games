import { IDirection } from "../utils/type";
import { Game } from "../../Game";
import { PlayableCharacter } from "../../Game/features/PlayableCharacter/PlayableCharacter";
import { MoveCommand } from "../../Game/features/Mouvement/MoveCommand";
import { MoveCommandFactory } from "../../features/Mouvement/MoveCommandFactory";

type IMoveCommand = {
  [key in IDirection]: MoveCommand;
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
  gameObject: PlayableCharacter;
  moveCommand: IMoveCommand;

  constructor(game: Game, gameObject: PlayableCharacter) {
    this.game = game;
    this.gameObject = gameObject;
    const commandFactory = new MoveCommandFactory(game, gameObject);
    this.moveCommand = {} as IMoveCommand;
    directions.forEach((direction) => {
      const command = commandFactory.getCommandForDirection(direction);
      game.getController().commands.push(command);
      this.moveCommand[direction] = command;
    });
  }

  getMoveCommand() {
    return this.moveCommand;
  }
}
