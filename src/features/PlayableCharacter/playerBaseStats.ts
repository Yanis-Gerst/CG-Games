import {
  baseStatistical,
  IStatistical,
} from "../../shared/GameObject/Units/Statistical";

export const playerBaseStats: IStatistical = {
  ...baseStatistical,
  moveSpeed: 0.2,
  attack_damage: 1,
  hp: 100,
  maxHp: 100,
};
