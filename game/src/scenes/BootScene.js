import Phaser from "../vendor/phaser-module.js";
import { createProceduralTextures } from "../systems/TextureFactory.js";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    createProceduralTextures(this);
    this.scene.start("GameScene");
  }
}
