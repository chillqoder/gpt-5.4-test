import Phaser from "../vendor/phaser-module.js";
import { COLORS, POINTER_DEADZONE } from "../config/constants.js";
import Molecule from "./Molecule.js";

export default class Player extends Molecule {
  constructor(scene, x, y) {
    super(scene, x, y, "shape-circle");
  }

  spawn(x, y) {
    return super.spawn(x, y, {
      alpha: 0.98,
      nutrition: 0,
      scoreValue: 1,
      stage: 1,
      texture: "shape-circle",
      tint: COLORS.player,
      type: "player",
    });
  }

  update(pointer) {
    if (!this.active || this.isBeingConsumed) {
      return;
    }

    const distance = Phaser.Math.Distance.Between(this.x, this.y, pointer.worldX, pointer.worldY);

    if (distance < POINTER_DEADZONE) {
      this.setVelocity(this.body.velocity.x * 0.82, this.body.velocity.y * 0.82);

      if (distance < POINTER_DEADZONE * 0.45) {
        this.body.stop();
      }

      this.syncFacing();
      return;
    }

    const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY);
    const speed = this.getMoveSpeed() * Phaser.Math.Clamp(distance / 220, 0.32, 1);
    const desiredX = Math.cos(angle) * speed;
    const desiredY = Math.sin(angle) * speed;

    this.setVelocity(
      Phaser.Math.Linear(this.body.velocity.x, desiredX, 0.22),
      Phaser.Math.Linear(this.body.velocity.y, desiredY, 0.22),
    );

    this.syncFacing();
  }
}
