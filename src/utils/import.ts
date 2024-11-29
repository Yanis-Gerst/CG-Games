import { Scene, SceneLoader } from "@babylonjs/core";

export const baseKeys = ["z", "q", "d", "s"] as const;

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

export const importModel = async (scene: Scene, fileName: string) => {
  return await SceneLoader.ImportMeshAsync(
    "",
    "./src/models/",
    fileName,
    scene
  );
};
