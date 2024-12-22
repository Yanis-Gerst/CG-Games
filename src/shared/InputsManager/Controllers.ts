import {
  AbstractActionManager,
  ActionManager,
  ExecuteCodeAction,
} from "@babylonjs/core";
import { Command } from "./Commands/Command";
import { baseKeys } from "../utils/utils";
import { Game } from "../../Game";

/*
Le controller gère tous les entrer clavier et gère l'éxécution et la fin des commandes quelles touches sont activer
*/

export class Controller {
  private keysStatus: { [key: string]: boolean };
  game: Game;
  public commands: Command[];
  private activeCommands: Command[];

  constructor(game: Game) {
    this.keysStatus = {};
    this.game = game;
    baseKeys.forEach((key) => (this.keysStatus[key] = false));
    this.commands = [];
    this.activeCommands = [];
  }

  getKeysStatus() {
    return this.keysStatus;
  }

  setKeys(key: string, value: boolean) {
    this.keysStatus[key] = value;
  }

  registerKeyActivation(actionManager: AbstractActionManager) {
    actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (event) => {
        let key = event.sourceEvent.key.toLowerCase();

        if (key in this.getKeysStatus()) {
          this.setKeys(key, true);
        }
      })
    );

    actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (event) => {
        let key = event.sourceEvent.key.toLowerCase();

        if (key in this.getKeysStatus()) {
          this.setKeys(key, false);
        }
      })
    );
  }

  handleCommands() {
    this.game.getScene().onBeforeRenderObservable.add(() => {
      const finishCommand = this.activeCommands.filter(
        (cmd) => !cmd.condition(this)
      );
      this.activeCommands = this.commands.filter((cmd) => cmd.condition(this));
      this.activeCommands.forEach((cmd) => cmd.execute());
      finishCommand.forEach((cmd) => cmd.finish());
      const commandPressing = new CustomEvent("commandPressing", {
        detail: {
          activeCommands: this.activeCommands,
          commands: this.commands,
        },
      });
      dispatchEvent(commandPressing);
    });
  }

  oneKeyIsPress(): boolean {
    return Object.values(this.keysStatus).includes(true);
  }

  pressedKey(): string[] {
    return Object.keys(this.keysStatus).filter((key) => this.keysStatus[key]);
  }
}
