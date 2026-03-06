import { MAX_STAGE } from "../config/constants.js";

export default class CollisionSystem {
  constructor(scene) {
    this.scene = scene;
  }

  setup() {
    const { physics, player, herbivoreGroup, carnivoreGroup, foodGroup } = this.scene;

    physics.add.overlap(player, foodGroup, (consumer, food) => {
      this.handleFoodCollision(consumer, food);
    });

    physics.add.overlap(herbivoreGroup, foodGroup, (consumer, food) => {
      this.handleFoodCollision(consumer, food);
    });

    physics.add.collider(player, herbivoreGroup, (a, b) => {
      this.handleMoleculeCollision(a, b);
    });

    physics.add.collider(player, carnivoreGroup, (a, b) => {
      this.handleMoleculeCollision(a, b);
    });

    physics.add.collider(herbivoreGroup, herbivoreGroup, (a, b) => {
      this.handleMoleculeCollision(a, b);
    });

    physics.add.collider(herbivoreGroup, carnivoreGroup, (a, b) => {
      this.handleMoleculeCollision(a, b);
    });

    physics.add.collider(carnivoreGroup, carnivoreGroup, (a, b) => {
      this.handleMoleculeCollision(a, b);
    });
  }

  handleFoodCollision(consumer, food) {
    if (
      this.scene.gameEnded ||
      !consumer?.active ||
      !food?.active ||
      consumer.isBeingConsumed ||
      food.isBeingConsumed
    ) {
      return;
    }

    if (consumer.type === "carnivore") {
      return;
    }

    this.consume(consumer, food, food.nutritionValue);
  }

  handleMoleculeCollision(first, second) {
    if (
      this.scene.gameEnded ||
      !first?.active ||
      !second?.active ||
      first === second ||
      first.isBeingConsumed ||
      second.isBeingConsumed
    ) {
      return;
    }

    if (first.stage === second.stage) {
      return;
    }

    const predator = first.stage > second.stage ? first : second;
    const prey = predator === first ? second : first;
    this.consume(predator, prey, prey.scoreValue ?? 1);
  }

  consume(predator, prey, nutritionValue) {
    if (!predator.active || !prey.active || predator.isBeingConsumed || prey.isBeingConsumed) {
      return;
    }

    prey.isBeingConsumed = true;

    if (prey.body) {
      prey.body.stop();
      prey.body.enable = false;
    }

    const startScaleX = prey.scaleX;
    const startScaleY = prey.scaleY;

    this.scene.tweens.add({
      targets: prey,
      x: predator.x,
      y: predator.y,
      alpha: 0,
      scaleX: Math.max(0.02, startScaleX * 0.08),
      scaleY: Math.max(0.02, startScaleY * 0.08),
      duration: 150,
      ease: "Quad.In",
      onComplete: () => {
        prey.despawn();
        prey.setAlpha(prey.alphaBase ?? 1);
        prey.setScale(startScaleX, startScaleY);

        if (!predator.scene || !predator.active) {
          return;
        }

        if (prey === this.scene.player) {
          this.scene.handleGameEnd(false);
          return;
        }

        predator.addNutrition(nutritionValue);

        if (predator === this.scene.player && predator.stage === MAX_STAGE) {
          this.scene.handleGameEnd(true);
        }
      },
    });
  }
}
