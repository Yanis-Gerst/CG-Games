import { IDirection } from "../utils/type";

export class MovingState {
  private isMoving = false;
  private direction: IDirection | null = null;

  constructor() {}

  getIsMoving() {
    return this.isMoving;
  }

  getDirection() {
    return this.direction;
  }

  setIsMoving(isMoving: boolean) {
    this.isMoving = isMoving;
  }

  setDirection(direction: IDirection | null) {
    this.direction = direction;
  }
}
