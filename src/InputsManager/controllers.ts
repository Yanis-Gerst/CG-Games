import {
  AbstractActionManager,
  ActionManager,
  ExecuteCodeAction,
  Scene,
} from "@babylonjs/core";
import { Command } from "./Commands/Command";
import { baseKeys } from "../utils/utils";

/*
Le controller gère tous les entrer clavier et gère l'éxécution et la fin des commandes quelles touches sont activer
*/

export class Controller {
  private keysStatus: { [key: string]: boolean };
  scene: Scene;
  public commands: Command[];
  private activeCommands: Command[];

  constructor(scene: Scene) {
    this.keysStatus = {};
    this.scene = scene;
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
          console.log(key in this.getKeysStatus());
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
    this.scene.onBeforeRenderObservable.add(() => {
      const finishCommand = this.activeCommands.filter(
        (cmd) => !cmd.condition(this)
      );
      this.activeCommands = this.commands.filter((cmd) => cmd.condition(this));
      this.activeCommands.forEach((cmd) => cmd.execute());
      finishCommand.forEach((cmd) => cmd.finish());
    });
  }

  oneKeyIsPress(): boolean {
    return Object.values(this.keysStatus).includes(true);
  }

  pressedKey(): string[] {
    return Object.keys(this.keysStatus).filter((key) => this.keysStatus[key]);
  }
}
