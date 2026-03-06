import { AI_MAX_STAGE, COLORS, EVOLUTION_THRESHOLD } from "../config/constants.js";
import Molecule from "./Molecule.js";

export default class AIMolecule extends Molecule {
  constructor(scene, x, y) {
    super(scene, x, y, "shape-diamond");
    this.diet = "herbivore";
  }

  spawn(x, y, config = {}) {
    const diet = config.diet ?? "herbivore";
    const isCarnivore = diet === "carnivore";

    this.diet = diet;

    return super.spawn(x, y, {
      alpha: isCarnivore ? 0.94 : 0.86,
      nutrition: config.nutrition ?? 0,
      scoreValue: config.scoreValue ?? 1,
      stage: config.stage ?? 1,
      texture: isCarnivore ? "shape-hexagon" : "shape-diamond",
      tint: config.tint ?? (isCarnivore ? COLORS.carnivore : COLORS.herbivore),
      type: diet,
    });
  }

  addNutrition(amount = 1) {
    let evolved = false;

    if (this.stage === AI_MAX_STAGE) {
      this.nutrition = EVOLUTION_THRESHOLD;
      return evolved;
    }

    this.nutrition += amount;

    while (this.nutrition >= EVOLUTION_THRESHOLD && this.stage < AI_MAX_STAGE) {
      this.nutrition -= EVOLUTION_THRESHOLD;
      this.setStage(this.stage + 1);
      evolved = true;
    }

    if (this.stage === AI_MAX_STAGE) {
      this.nutrition = EVOLUTION_THRESHOLD;
    }

    return evolved;
  }
}
