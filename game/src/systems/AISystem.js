import Phaser from "../vendor/phaser-module.js";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../config/constants.js";

export default class AISystem {
  constructor(scene) {
    this.scene = scene;
  }

  update(time) {
    this.scene.herbivoreGroup.children.iterate((molecule) => {
      if (!molecule?.active) {
        return;
      }

      this.updateHerbivore(molecule, time);
    });

    this.scene.carnivoreGroup.children.iterate((molecule) => {
      if (!molecule?.active) {
        return;
      }

      this.updateCarnivore(molecule, time);
    });
  }

  updateHerbivore(molecule, time) {
    if (time >= molecule.nextThinkAt) {
      molecule.nextThinkAt = time + Phaser.Math.Between(180, 280);
      molecule.target = this.findNearestFood(molecule);

      if (!molecule.target) {
        molecule.wanderPoint = this.getNearbyWanderPoint(molecule);
      }
    }

    if (molecule.target && molecule.target.active && !molecule.target.isBeingConsumed) {
      this.scene.physics.moveToObject(molecule, molecule.target, molecule.getMoveSpeed() * 0.84);
    } else {
      molecule.target = null;
      this.followWanderPoint(molecule);
    }

    molecule.syncFacing();
  }

  updateCarnivore(molecule, time) {
    if (time >= molecule.nextThinkAt) {
      molecule.nextThinkAt = time + Phaser.Math.Between(160, 240);
      molecule.target = this.findNearestPrey(molecule);

      if (!molecule.target) {
        molecule.wanderPoint = this.getNearbyWanderPoint(molecule, 320);
      }
    }

    if (this.isValidPrey(molecule, molecule.target)) {
      this.scene.physics.moveToObject(molecule, molecule.target, molecule.getMoveSpeed() * 1.02);
    } else {
      molecule.target = null;
      this.followWanderPoint(molecule);
    }

    molecule.syncFacing();
  }

  followWanderPoint(molecule) {
    if (!molecule.wanderPoint) {
      molecule.wanderPoint = this.getNearbyWanderPoint(molecule);
    }

    const distance = Phaser.Math.Distance.Between(
      molecule.x,
      molecule.y,
      molecule.wanderPoint.x,
      molecule.wanderPoint.y,
    );

    if (distance < 34) {
      molecule.wanderPoint = this.getNearbyWanderPoint(molecule);
    }

    this.scene.physics.moveTo(
      molecule,
      molecule.wanderPoint.x,
      molecule.wanderPoint.y,
      molecule.getMoveSpeed() * 0.52,
    );
  }

  getNearbyWanderPoint(molecule, radius = 240) {
    return {
      x: Phaser.Math.Clamp(
        molecule.x + Phaser.Math.Between(-radius, radius),
        32,
        WORLD_WIDTH - 32,
      ),
      y: Phaser.Math.Clamp(
        molecule.y + Phaser.Math.Between(-radius, radius),
        32,
        WORLD_HEIGHT - 32,
      ),
    };
  }

  findNearestFood(molecule) {
    let nearest = null;
    let nearestDistance = molecule.getRadarRadius();

    this.scene.foodGroup.children.iterate((food) => {
      if (!food?.active || food.isBeingConsumed) {
        return;
      }

      const distance = Phaser.Math.Distance.Between(molecule.x, molecule.y, food.x, food.y);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = food;
      }
    });

    return nearest;
  }

  findNearestPrey(hunter) {
    let nearest = null;
    let nearestDistance = hunter.getRadarRadius();
    const maybeAssign = (target) => {
      if (!this.isValidPrey(hunter, target)) {
        return;
      }

      const distance = Phaser.Math.Distance.Between(hunter.x, hunter.y, target.x, target.y);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = target;
      }
    };

    maybeAssign(this.scene.player);
    this.scene.herbivoreGroup.children.iterate(maybeAssign);
    this.scene.carnivoreGroup.children.iterate((candidate) => {
      if (candidate === hunter) {
        return;
      }

      maybeAssign(candidate);
    });

    return nearest;
  }

  isValidPrey(hunter, target) {
    return Boolean(
      target &&
        target.active &&
        !target.isBeingConsumed &&
        target !== hunter &&
        target.stage < hunter.stage,
    );
  }
}
