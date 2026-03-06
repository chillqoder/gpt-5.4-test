import Phaser from "../vendor/phaser-module.js";
import {
  AI_MAX_STAGE,
  SPAWN_COUNTS,
  SPAWN_MARGIN,
  SPAWN_SAFE_RADIUS,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "../config/constants.js";

function randomFrom(values) {
  return Phaser.Utils.Array.GetRandom(values);
}

export default class SpawnSystem {
  constructor(scene) {
    this.scene = scene;
    this.nextMaintainAt = 0;
  }

  seedInitial() {
    this.maintainPools();
  }

  update(time) {
    if (this.scene.gameEnded || time < this.nextMaintainAt) {
      return;
    }

    this.nextMaintainAt = time + 420;
    this.maintainPools();
  }

  maintainPools() {
    this.fillFood();
    this.fillGroup(this.scene.herbivoreGroup, SPAWN_COUNTS.herbivores, "herbivore");
    this.fillGroup(this.scene.carnivoreGroup, SPAWN_COUNTS.carnivores, "carnivore");
  }

  fillFood() {
    while (this.scene.foodGroup.countActive(true) < SPAWN_COUNTS.food) {
      const dot = this.scene.foodGroup.getFirstDead(false);

      if (!dot) {
        break;
      }

      const point = this.getSpawnPoint(SPAWN_SAFE_RADIUS * 0.6);
      dot.spawn(point.x, point.y);
    }
  }

  fillGroup(group, targetCount, diet) {
    while (group.countActive(true) < targetCount) {
      const molecule = group.getFirstDead(false);

      if (!molecule) {
        break;
      }

      const point = this.getSpawnPoint(SPAWN_SAFE_RADIUS);

      molecule.spawn(point.x, point.y, {
        diet,
        scoreValue: 1,
        stage: diet === "carnivore" ? this.pickCarnivoreStage() : this.pickHerbivoreStage(),
      });
    }
  }

  pickHerbivoreStage() {
    const playerStage = this.scene.player.stage;

    if (playerStage <= 2) {
      return randomFrom([1, 1, 1, 1, 2, 2, 2, 3]);
    }

    if (playerStage === 3) {
      return randomFrom([1, 2, 2, 2, 3, 3, 3, 4]);
    }

    return randomFrom([2, 2, 3, 3, 3, 4, 4]);
  }

  pickCarnivoreStage() {
    const playerStage = this.scene.player.stage;

    if (playerStage <= 2) {
      return randomFrom([2, 2, 2, 3, 3]);
    }

    if (playerStage === 3) {
      return randomFrom([2, 2, 3, 3, 4]);
    }

    return Phaser.Math.Clamp(randomFrom([2, 3, 3, 4, 4]), 2, AI_MAX_STAGE);
  }

  getSpawnPoint(safeRadius) {
    const player = this.scene.player;

    for (let attempt = 0; attempt < 28; attempt += 1) {
      const x = Phaser.Math.Between(SPAWN_MARGIN, WORLD_WIDTH - SPAWN_MARGIN);
      const y = Phaser.Math.Between(SPAWN_MARGIN, WORLD_HEIGHT - SPAWN_MARGIN);

      if (!player || !player.active) {
        return { x, y };
      }

      const distance = Phaser.Math.Distance.Between(player.x, player.y, x, y);

      if (distance >= safeRadius) {
        return { x, y };
      }
    }

    return {
      x: Phaser.Math.Between(SPAWN_MARGIN, WORLD_WIDTH - SPAWN_MARGIN),
      y: Phaser.Math.Between(SPAWN_MARGIN, WORLD_HEIGHT - SPAWN_MARGIN),
    };
  }
}
