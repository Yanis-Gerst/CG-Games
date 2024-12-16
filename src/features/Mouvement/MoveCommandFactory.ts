import { Game } from "../../Game";
import { IDirection } from "../../shared/utils/type";
import { PlayableCharacter } from "../PlayableCharacter/PlayableCharacter";
import { MoveCommand } from "./MoveCommand";

export class MoveCommandFactory {
  game: Game;
  gameObject: PlayableCharacter;
  constructor(game: Game, gameObject: PlayableCharacter) {
    this.game = game;
    this.gameObject = gameObject;
  }

  getCommandForDirection(direction: IDirection) {
    switch (direction) {
      case "up":
        return new MoveCommand(
          this.game,
          ["z"],
          this.gameObject,
          direction,
          (controller) => {
            const pressedKey = controller.pressedKey();
            return (
              pressedKey.includes("z") &&
              !pressedKey.includes("q") &&
              !pressedKey.includes("d")
            );
          }
        );
      case "left":
        return new MoveCommand(
          this.game,
          ["-x"],
          this.gameObject,
          direction,
          (controller) => {
            const pressedKey = controller.pressedKey();
            return (
              pressedKey.includes("q") &&
              !pressedKey.includes("z") &&
              !pressedKey.includes("s")
            );
          }
        );
      case "right":
        return new MoveCommand(
          this.game,
          ["x"],
          this.gameObject,
          direction,
          (controller) => {
            const pressedKey = controller.pressedKey();
            return (
              pressedKey.includes("d") &&
              !pressedKey.includes("z") &&
              !pressedKey.includes("s")
            );
          }
        );
      case "down":
        return new MoveCommand(
          this.game,
          ["-z"],
          this.gameObject,
          direction,
          (controller) => {
            const pressedKey = controller.pressedKey();
            return (
              pressedKey.includes("s") &&
              !pressedKey.includes("q") &&
              !pressedKey.includes("d")
            );
          }
        );
      case "upRight":
        return new MoveCommand(
          this.game,
          ["z", "x"],
          this.gameObject,
          direction,
          (controller) => {
            const pressedKey = controller.pressedKey();
            return pressedKey.includes("z") && pressedKey.includes("d");
          }
        );
      case "upLeft":
        return new MoveCommand(
          this.game,
          ["z", "-x"],
          this.gameObject,
          direction,
          (controller) => {
            const pressedKey = controller.pressedKey();
            return pressedKey.includes("z") && pressedKey.includes("q");
          }
        );
      case "downRight":
        return new MoveCommand(
          this.game,
          ["-z", "x"],
          this.gameObject,
          direction,
          (controller) => {
            const pressedKey = controller.pressedKey();
            return pressedKey.includes("s") && pressedKey.includes("d");
          }
        );
      case "downLeft":
        return new MoveCommand(
          this.game,
          ["-z", "-x"],
          this.gameObject,
          direction,
          (controller) => {
            const pressedKey = controller.pressedKey();
            return pressedKey.includes("s") && pressedKey.includes("q");
          }
        );
    }
  }
}
