export type Ikeys =
  | "moveUp"
  | "moveDown"
  | "moveLeft"
  | "moveRight"
  | "firstSpell"
  | "secondSpell"
  | "thirdSpell"
  | "dash";

export type IControlKey = {
  [command in Ikeys]: string;
};
export const controlKeys: Partial<IControlKey> = {
  moveUp: "z",
  moveDown: "s",
  moveLeft: "q",
  moveRight: "d",
};

export type IDirection =
  | "up"
  | "left"
  | "right"
  | "down"
  | "upRight"
  | "upLeft"
  | "downRight"
  | "downLeft";

export interface ICommand {
  execute: () => void;
  finish: () => void;
}
