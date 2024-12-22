import { PlayableCharacter } from "./PlayableCharacter";

export class PlayerAnimation {
  private playableCharacter: PlayableCharacter;
  constructor(playableCharacter: PlayableCharacter) {
    this.playableCharacter = playableCharacter;
  }

  public animate() {
    if (this.playableCharacter.getMovingState().getIsMoving()) {
      this.playableCharacter.playAnimation("Rotation");
    } else {
      this.playableCharacter.stopAnimation("Rotation");
    }
  }
}
