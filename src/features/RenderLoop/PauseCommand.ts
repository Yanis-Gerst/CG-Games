import { Game } from "../../Game";
import { Command } from "../../shared/InputsManager/Commands/Command";
import { Controller } from "../../shared/InputsManager/Controllers";

export class PauseCommand extends Command {
  escapeKeyToogle = false;
  isPressing = false;

  constructor(game: Game) {
    super(game);
  }

  execute(): void {
    super.execute();
    this.game.renderLoop.setPaused(true);
  }

  finish(): void {
    super.finish();
    this.game.renderLoop.setPaused(false);
  }

  condition(controller: Controller): boolean {
    if (controller.pressedKey().includes("escape") && !this.isPressing) {
      this.escapeKeyToogle = !this.escapeKeyToogle;
      this.isPressing = true;
    }

    if (!controller.pressedKey().includes("escape") && this.isPressing) {
      this.isPressing = false;
    }

    return this.escapeKeyToogle;
  }
}
