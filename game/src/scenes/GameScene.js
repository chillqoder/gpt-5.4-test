import Phaser from "../vendor/phaser-module.js";
import {
  COLORS,
  EVOLUTION_THRESHOLD,
  POOL_SIZES,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "../config/constants.js";
import AIMolecule from "../entities/AIMolecule.js";
import FoodDot from "../entities/FoodDot.js";
import Player from "../entities/Player.js";
import AISystem from "../systems/AISystem.js";
import CollisionSystem from "../systems/CollisionSystem.js";
import HealthBarRenderer from "../systems/HealthBarRenderer.js";
import SpawnSystem from "../systems/SpawnSystem.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.gameEnded = false;
  }

  create() {
    this.gameEnded = false;
    this.createWorld();
    this.createPools();
    this.createPlayer();

    this.spawnSystem = new SpawnSystem(this);
    this.aiSystem = new AISystem(this);
    this.collisionSystem = new CollisionSystem(this);
    this.healthBars = new HealthBarRenderer(this);

    this.spawnSystem.seedInitial();
    this.collisionSystem.setup();
    this.createHud();
    this.createOverlay();
    this.layoutUi(this.scale.gameSize);

    this.scale.on("resize", this.layoutUi, this);
    this.events.once("shutdown", this.handleShutdown, this);
  }

  createWorld() {
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBackgroundColor(COLORS.background);

    this.add
      .rectangle(WORLD_WIDTH * 0.5, WORLD_HEIGHT * 0.5, WORLD_WIDTH, WORLD_HEIGHT, 0x08223f, 1)
      .setDepth(-20);

    for (let index = 0; index < 26; index += 1) {
      this.add
        .ellipse(
          Phaser.Math.Between(0, WORLD_WIDTH),
          Phaser.Math.Between(0, WORLD_HEIGHT),
          Phaser.Math.Between(140, 340),
          Phaser.Math.Between(80, 220),
          Phaser.Math.RND.pick([0x1f5f93, 0x14527f, 0x2f6b92]),
          Phaser.Math.FloatBetween(0.08, 0.18),
        )
        .setDepth(-19);
    }

    this.bubbles = [];

    for (let index = 0; index < 44; index += 1) {
      const bubble = this.add
        .image(
          Phaser.Math.Between(0, WORLD_WIDTH),
          Phaser.Math.Between(0, WORLD_HEIGHT),
          "bubble",
        )
        .setDepth(-18)
        .setScale(Phaser.Math.FloatBetween(0.45, 1.4))
        .setAlpha(Phaser.Math.FloatBetween(0.08, 0.38));

      this.bubbles.push(bubble);
      this.animateBubble(bubble, true);
    }
  }

  animateBubble(bubble, initial = false) {
    bubble.x = Phaser.Math.Between(0, WORLD_WIDTH);
    bubble.y = initial
      ? Phaser.Math.Between(0, WORLD_HEIGHT)
      : WORLD_HEIGHT + Phaser.Math.Between(30, 340);
    bubble.alpha = Phaser.Math.FloatBetween(0.08, 0.38);
    bubble.setScale(Phaser.Math.FloatBetween(0.45, 1.4));

    this.tweens.add({
      targets: bubble,
      y: -Phaser.Math.Between(60, 220),
      x: bubble.x + Phaser.Math.Between(-80, 80),
      alpha: 0,
      duration: Phaser.Math.Between(7000, 15000),
      delay: initial ? Phaser.Math.Between(0, 8000) : 0,
      ease: "Sine.Out",
      onComplete: () => {
        if (bubble.scene) {
          this.animateBubble(bubble);
        }
      },
    });
  }

  createPools() {
    this.foodGroup = this.physics.add.group();
    this.herbivoreGroup = this.physics.add.group();
    this.carnivoreGroup = this.physics.add.group();

    for (let index = 0; index < POOL_SIZES.food; index += 1) {
      const dot = new FoodDot(this, -200, -200);
      dot.despawn();
      this.foodGroup.add(dot);
    }

    for (let index = 0; index < POOL_SIZES.herbivores; index += 1) {
      const herbivore = new AIMolecule(this, -200, -200);
      herbivore.despawn();
      this.herbivoreGroup.add(herbivore);
    }

    for (let index = 0; index < POOL_SIZES.carnivores; index += 1) {
      const carnivore = new AIMolecule(this, -200, -200);
      carnivore.despawn();
      this.carnivoreGroup.add(carnivore);
    }
  }

  createPlayer() {
    this.player = new Player(this, WORLD_WIDTH * 0.5, WORLD_HEIGHT * 0.5);
    this.player.spawn(WORLD_WIDTH * 0.5, WORLD_HEIGHT * 0.5);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    const { activePointer } = this.input;
    activePointer.position.set(this.scale.width * 0.5, this.scale.height * 0.5);
    activePointer.prevPosition.copy(activePointer.position);
    activePointer.updateWorldPoint(this.cameras.main);
  }

  createHud() {
    const textStyle = {
      color: "#d8f5ff",
      fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
      fontSize: "20px",
      fontStyle: "bold",
      stroke: "#031019",
      strokeThickness: 4,
    };

    const subStyle = {
      color: "#a9d4e6",
      fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
      fontSize: "14px",
      stroke: "#031019",
      strokeThickness: 4,
    };

    this.stageText = this.add.text(24, 20, "", textStyle).setDepth(2200).setScrollFactor(0);
    this.statusText = this.add.text(24, 52, "", subStyle).setDepth(2200).setScrollFactor(0);
  }

  createOverlay() {
    this.overlayShade = this.add
      .rectangle(0, 0, this.scale.width, this.scale.height, COLORS.panel, 0.76)
      .setOrigin(0)
      .setDepth(3000)
      .setScrollFactor(0)
      .setVisible(false);

    this.overlayTitle = this.add
      .text(0, 0, "", {
        color: "#f2fbff",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "44px",
        fontStyle: "bold",
        stroke: "#021019",
        strokeThickness: 6,
      })
      .setDepth(3001)
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setVisible(false);

    this.overlayBody = this.add
      .text(0, 0, "", {
        align: "center",
        color: "#b9dbea",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "18px",
        stroke: "#021019",
        strokeThickness: 5,
      })
      .setDepth(3001)
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setVisible(false);

    this.restartButton = this.add
      .rectangle(0, 0, 180, 50, 0x0e3d60, 0.96)
      .setDepth(3001)
      .setScrollFactor(0)
      .setStrokeStyle(2, 0x7df5ff, 0.55)
      .setInteractive({ useHandCursor: true })
      .setVisible(false);

    this.restartButton.on("pointerover", () => {
      this.restartButton.fillColor = 0x155780;
    });

    this.restartButton.on("pointerout", () => {
      this.restartButton.fillColor = 0x0e3d60;
    });

    this.restartButton.on("pointerup", () => {
      this.scene.restart();
    });

    this.restartLabel = this.add
      .text(0, 0, "Restart", {
        color: "#e7fbff",
        fontFamily: "Trebuchet MS, Segoe UI, sans-serif",
        fontSize: "20px",
        fontStyle: "bold",
      })
      .setDepth(3002)
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setVisible(false);
  }

  update(time) {
    if (!this.gameEnded) {
      this.input.activePointer.updateWorldPoint(this.cameras.main);
      this.player.update(this.input.activePointer);
      this.aiSystem.update(time);
      this.spawnSystem.update(time);
    }

    this.healthBars.render();
    this.updateHud();
  }

  updateHud() {
    const progressText =
      this.player.stage >= 5
        ? "Apex predator achieved"
        : `Evolution progress ${this.player.nutrition}/${EVOLUTION_THRESHOLD}`;

    this.stageText.setText(`Stage ${this.player.stage}  |  Size ${Math.round(this.player.displayWidth)}`);
    this.statusText.setText(
      `${progressText}  |  Herbivores ${this.herbivoreGroup.countActive(true)}  |  Carnivores ${this.carnivoreGroup.countActive(true)}`,
    );
  }

  handleGameEnd(victory) {
    if (this.gameEnded) {
      return;
    }

    this.gameEnded = true;
    this.physics.pause();

    if (this.player.body) {
      this.player.body.stop();
    }

    this.overlayTitle.setText(victory ? "Evolution Complete" : "Consumed");
    this.overlayBody.setText(
      victory
        ? "You reached Stage 5 and became the apex predator."
        : "A larger molecule absorbed you. Restart and evolve faster.",
    );

    this.overlayShade.setVisible(true);
    this.overlayTitle.setVisible(true);
    this.overlayBody.setVisible(true);
    this.restartButton.setVisible(true);
    this.restartLabel.setVisible(true);
  }

  layoutUi(gameSize) {
    const width = gameSize.width ?? this.scale.width;
    const height = gameSize.height ?? this.scale.height;

    if (this.overlayShade) {
      this.overlayShade.setSize(width, height);
    }

    if (this.overlayTitle) {
      this.overlayTitle.setPosition(width * 0.5, height * 0.42);
    }

    if (this.overlayBody) {
      this.overlayBody.setPosition(width * 0.5, height * 0.5);
    }

    if (this.restartButton) {
      this.restartButton.setPosition(width * 0.5, height * 0.6);
    }

    if (this.restartLabel) {
      this.restartLabel.setPosition(width * 0.5, height * 0.6);
    }
  }

  handleShutdown() {
    this.scale.off("resize", this.layoutUi, this);
    this.healthBars?.destroy();
  }
}
