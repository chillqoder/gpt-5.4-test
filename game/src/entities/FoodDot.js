import Phaser from "../vendor/phaser-module.js";
import { COLORS } from "../config/constants.js";

export default class FoodDot extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "food-dot");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.nutritionValue = 1;
    this.isBeingConsumed = false;
    this.setDepth(5);
  }

  spawn(x, y) {
    const scale = Phaser.Math.FloatBetween(0.78, 1.24);
    const radius = Math.floor(13 * scale);
    const offset = 16 * scale - radius;

    this.enableBody(true, x, y, true, true);
    this.body.enable = true;
    this.body.reset(x, y);
    this.body.allowGravity = false;
    this.body.setCircle(radius);
    this.body.setOffset(offset, offset);
    this.body.setImmovable(true);
    this.body.moves = false;
    this.isBeingConsumed = false;
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
    this.setScale(scale);
    this.setTint(COLORS.food);
    this.setAlpha(Phaser.Math.FloatBetween(0.64, 0.92));

    return this;
  }

  despawn() {
    this.isBeingConsumed = false;
    this.setActive(false);
    this.setVisible(false);
    this.setPosition(-200, -200);

    if (this.body) {
      this.body.enable = false;
    }
  }
}
