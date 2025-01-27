import { Game } from "../../Game";
import { Controller } from "./Controllers";

export class BrowserInputController extends Controller {
  constructor(game: Game) {
    super(game);
  }

  handleCommands(): void {
    this.game
      .getScene()
      .onKeyboardObservable.add(() => this.handleCommandLifeCycleCommand());
  }

  handleCommandLifeCycleCommand(): void {
    super.handleCommandLifeCycleCommand();
  }
}
