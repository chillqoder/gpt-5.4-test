import Phaser from "../vendor/phaser-module.js";
import { EVOLUTION_THRESHOLD, MAX_STAGE, STAGE_STATS } from "../config/constants.js";

export default class Molecule extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = "shape-circle") {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.type = "molecule";
    this.baseTint = 0xffffff;
    this.alphaBase = 1;
    this.stage = 1;
    this.nutrition = 0;
    this.scoreValue = 1;
    this.isBeingConsumed = false;
    this.target = null;
    this.wanderPoint = null;
    this.nextThinkAt = 0;

    this.setBounce(0.92);
    this.setCollideWorldBounds(true);
    this.setDamping(true);
    this.setDrag(0.9);
    this.setDepth(10);
  }

  spawn(x, y, config = {}) {
    const {
      alpha = 0.94,
      nutrition = 0,
      scoreValue = 1,
      stage = 1,
      texture = this.texture.key,
      tint = 0xffffff,
      type = "molecule",
    } = config;

    if (texture !== this.texture.key) {
      this.setTexture(texture);
    }

    this.enableBody(true, x, y, true, true);
    this.body.enable = true;
    this.body.reset(x, y);
    this.body.allowGravity = false;
    this.setActive(true);
    this.setVisible(true);
    this.setVelocity(0, 0);
    this.setAlpha(alpha);
    this.alphaBase = alpha;
    this.baseTint = tint;
    this.setTint(tint);
    this.type = type;
    this.nutrition = nutrition;
    this.scoreValue = scoreValue;
    this.isBeingConsumed = false;
    this.target = null;
    this.wanderPoint = null;
    this.nextThinkAt = 0;
    this.setStage(stage);

    return this;
  }

  despawn() {
    this.isBeingConsumed = false;
    this.target = null;
    this.wanderPoint = null;
    this.setActive(false);
    this.setVisible(false);
    this.setPosition(-200, -200);

    if (this.body) {
      this.body.stop();
      this.body.enable = false;
    }
  }

  setStage(stage) {
    this.stage = Phaser.Math.Clamp(stage, 1, MAX_STAGE);
    const stats = STAGE_STATS[this.stage];
    const diameter = stats.size;
    const radius = Math.floor(diameter * 0.42);
    const offset = (diameter - radius * 2) * 0.5;

    this.setDisplaySize(diameter, diameter);
    this.setMaxVelocity(stats.speed, stats.speed);
    this.body.setCircle(radius);
    this.body.setOffset(offset, offset);
    this.setDepth(10 + this.stage);

    return this;
  }

  getMoveSpeed() {
    return STAGE_STATS[this.stage].speed;
  }

  getRadarRadius() {
    return STAGE_STATS[this.stage].radar;
  }

  getRadius() {
    return STAGE_STATS[this.stage].size * 0.42;
  }

  addNutrition(amount = 1) {
    let evolved = false;

    if (this.stage === MAX_STAGE) {
      this.nutrition = EVOLUTION_THRESHOLD;
      return evolved;
    }

    this.nutrition += amount;

    while (this.nutrition >= EVOLUTION_THRESHOLD && this.stage < MAX_STAGE) {
      this.nutrition -= EVOLUTION_THRESHOLD;
      this.setStage(this.stage + 1);
      evolved = true;
    }

    if (this.stage === MAX_STAGE) {
      this.nutrition = EVOLUTION_THRESHOLD;
    }

    return evolved;
  }

  getBarRatio() {
    if (this.stage === MAX_STAGE) {
      return 1;
    }

    return Phaser.Math.Clamp(this.nutrition / EVOLUTION_THRESHOLD, 0.08, 1);
  }

  syncFacing() {
    if (!this.body || this.body.velocity.lengthSq() < 16) {
      return;
    }

    this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, this.body.velocity.angle(), 0.1);
  }
}
