import { Game } from "../../Game";
import { Command } from "./Command";
import { Controller } from "../Controllers";

export type IAxis = "x" | "y" | "z";

export class MoveCommand extends Command {
  axis: string[];
  cond: (controller: Controller) => boolean;

  constructor(
    game: Game,
    axis: string[],
    cond: (controller: Controller) => boolean
  ) {
    super(game);
    this.axis = axis;
    this.cond = cond;
  }

  execute(): void {
    console.log(this.axis);
    this.axis.forEach((axi) => {
      const minus = axi.includes("-");
      const currentAxi = axi.replace("-", "") as IAxis;
      let positionToUpdate = this.game.player.speed / this.axis.length;
      positionToUpdate = minus ? -positionToUpdate : positionToUpdate;
      this.game.player.root.position[currentAxi] += positionToUpdate;
      this.game.player.playAnimation("Rotation");
    });
  }

  finish(): void {
    this.game.player.stopAnimation("Rotation");
  }

  condition(controller: Controller): boolean {
    return this.cond(controller);
  }
}
