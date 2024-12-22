import { Game } from "../../../Game";
import { IModel } from "../../Models/interface";
import { GameObject } from "../GameObject";
import { MovingState } from "../MovingState";
import { Statistical } from "./Statistical";

export class Units extends GameObject {
  private statistical: Statistical;
  private movingState: MovingState;
  constructor(model: IModel, game: Game) {
    super(model, game);
    this.statistical = new Statistical();
    this.movingState = new MovingState();
  }

  getMovingState() {
    return this.movingState;
  }

  getStatistical() {
    return this.statistical;
  }
}
