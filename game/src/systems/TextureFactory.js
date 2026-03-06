import Phaser from "../vendor/phaser-module.js";

function drawPolygon(graphics, points) {
  graphics.beginPath();
  graphics.moveTo(points[0].x, points[0].y);

  for (let index = 1; index < points.length; index += 1) {
    graphics.lineTo(points[index].x, points[index].y);
  }

  graphics.closePath();
  graphics.fillPath();
}

export function createProceduralTextures(scene) {
  if (scene.textures.exists("shape-circle")) {
    return;
  }

  const graphics = scene.make.graphics({ x: 0, y: 0, add: false });

  graphics.clear();
  graphics.fillStyle(0xffffff, 1);
  graphics.lineStyle(3, 0xffffff, 0.5);
  graphics.fillCircle(48, 48, 40);
  graphics.strokeCircle(48, 48, 40);
  graphics.generateTexture("shape-circle", 96, 96);

  graphics.clear();
  graphics.fillStyle(0xffffff, 1);
  graphics.lineStyle(3, 0xffffff, 0.5);
  drawPolygon(graphics, [
    new Phaser.Geom.Point(48, 8),
    new Phaser.Geom.Point(88, 48),
    new Phaser.Geom.Point(48, 88),
    new Phaser.Geom.Point(8, 48),
  ]);
  graphics.strokePoints(
    [
      new Phaser.Geom.Point(48, 8),
      new Phaser.Geom.Point(88, 48),
      new Phaser.Geom.Point(48, 88),
      new Phaser.Geom.Point(8, 48),
      new Phaser.Geom.Point(48, 8),
    ],
    true,
  );
  graphics.generateTexture("shape-diamond", 96, 96);

  graphics.clear();
  graphics.fillStyle(0xffffff, 1);
  graphics.lineStyle(3, 0xffffff, 0.5);
  drawPolygon(graphics, [
    new Phaser.Geom.Point(48, 6),
    new Phaser.Geom.Point(82, 24),
    new Phaser.Geom.Point(82, 72),
    new Phaser.Geom.Point(48, 90),
    new Phaser.Geom.Point(14, 72),
    new Phaser.Geom.Point(14, 24),
  ]);
  graphics.strokePoints(
    [
      new Phaser.Geom.Point(48, 6),
      new Phaser.Geom.Point(82, 24),
      new Phaser.Geom.Point(82, 72),
      new Phaser.Geom.Point(48, 90),
      new Phaser.Geom.Point(14, 72),
      new Phaser.Geom.Point(14, 24),
      new Phaser.Geom.Point(48, 6),
    ],
    true,
  );
  graphics.generateTexture("shape-hexagon", 96, 96);

  graphics.clear();
  graphics.fillStyle(0xffffff, 1);
  graphics.lineStyle(2, 0xffffff, 0.45);
  graphics.fillCircle(16, 16, 11);
  graphics.strokeCircle(16, 16, 11);
  graphics.generateTexture("food-dot", 32, 32);

  graphics.clear();
  graphics.fillStyle(0xffffff, 0.45);
  graphics.lineStyle(2, 0xffffff, 0.6);
  graphics.fillCircle(12, 12, 9);
  graphics.strokeCircle(12, 12, 9);
  graphics.generateTexture("bubble", 24, 24);

  graphics.destroy();
}
