import {
  baseStatistical,
  IStatistical,
} from "../../../shared/GameObject/Units/Statistical";

export const ennemyBaseStats: IStatistical = {
  ...baseStatistical,
  moveSpeed: 0.1,
  attack_damage: 1,
  hp: 3,
  maxHp: 3,
};
