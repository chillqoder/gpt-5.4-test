export default class HealthBarRenderer {
  constructor(scene) {
    this.scene = scene;
    this.graphics = scene.add.graphics().setDepth(1500);
  }

  render() {
    this.graphics.clear();
    this.drawEntity(this.scene.player);

    this.scene.herbivoreGroup.children.iterate((entity) => {
      this.drawEntity(entity);
    });

    this.scene.carnivoreGroup.children.iterate((entity) => {
      this.drawEntity(entity);
    });
  }

  drawEntity(entity) {
    if (!entity?.active || entity.isBeingConsumed) {
      return;
    }

    const width = Math.max(24, entity.displayWidth * 0.92);
    const height = 6;
    const x = entity.x - width * 0.5;
    const y = entity.y - entity.displayHeight * 0.84;

    this.graphics.fillStyle(0x04111d, 0.72);
    this.graphics.fillRoundedRect(x, y, width, height, 3);
    this.graphics.fillStyle(entity.baseTint, 0.96);
    this.graphics.fillRoundedRect(
      x + 1,
      y + 1,
      Math.max(3, (width - 2) * entity.getBarRatio()),
      height - 2,
      2,
    );
  }

  destroy() {
    this.graphics.destroy();
  }
}
