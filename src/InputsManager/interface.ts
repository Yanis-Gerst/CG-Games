export interface ICommand {
  execute: () => void;
  finish: () => void;
}
