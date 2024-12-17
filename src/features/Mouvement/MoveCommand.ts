import { Game } from "../../Game";
import { Command } from "../../shared/InputsManager/Commands/Command";
import { Controller } from "../../shared/InputsManager/Controllers";
import { IDirection } from "../../shared/utils/type";
import { PlayableCharacter } from "../PlayableCharacter/PlayableCharacter";

export type IAxis = "x" | "y" | "z";

export class MoveCommand extends Command {
  axis: string[];
  gameObject: PlayableCharacter;
  direction: IDirection;
  cond: (controller: Controller) => boolean;

  constructor(
    game: Game,
    axis: string[],
    gameObject: PlayableCharacter,
    direction: IDirection,
    cond: (controller: Controller) => boolean
  ) {
    super(game);
    this.gameObject = gameObject;
    this.axis = axis;
    this.direction = direction;
    this.cond = cond;
  }

  execute(): void {
    super.execute();
    this.axis.forEach((axi) => {
      const minus = axi.includes("-");
      const currentAxi = axi.replace("-", "") as IAxis;
      //TODO: Chagne la vitesse en diago
      let positionToUpdate = this.gameObject.speed / this.axis.length;
      positionToUpdate = minus ? -positionToUpdate : positionToUpdate;
      this.gameObject.model.getPosition()[currentAxi] += positionToUpdate;
      this.gameObject.playAnimation("Rotation");
    });
  }

  finish(): void {
    super.finish();
    this.gameObject.stopAnimation("Rotation");
  }

  condition(controller: Controller): boolean {
    return this.cond(controller);
  }
}
