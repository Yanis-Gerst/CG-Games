import {
  AbstractActionManager,
  ActionManager,
  ExecuteCodeAction,
  Scene,
} from "@babylonjs/core";
import { baseKeys } from "../utils/import";

export class Controller {
  private keysStatus: { [key: string]: boolean };
  scene: Scene;

  constructor(scene: Scene) {
    this.keysStatus = {};
    this.scene = scene;
    baseKeys.forEach((key) => (this.keysStatus[key] = false));
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
        console.log(this.getKeysStatus());
      })
    );

    actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (event) => {
        let key = event.sourceEvent.key.toLowerCase();

        if (key in this.getKeysStatus()) {
          this.setKeys(key, false);
        }
        console.log(this.getKeysStatus());
      })
    );
  }

  onKeyPress(
    scene: Scene,
    key: string,
    keyPressCb: CallableFunction,
    keyReleaseCb: CallableFunction
  ) {
    scene.onBeforeRenderObservable.add(() => {
      if (this.pressedKey().includes(key)) {
        keyPressCb();
      } else {
        keyReleaseCb();
      }
    });
  }

  oneKeyIsPress(): boolean {
    return Object.values(this.keysStatus).includes(true);
  }

  pressedKey(): string[] {
    return Object.keys(this.keysStatus).filter((key) => this.keysStatus[key]);
  }
}
