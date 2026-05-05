// Canvas rendering routines for the growing-vines animation system

import type { BranchState, Blossom, Petal, Vec2 } from './types';

export interface RendererAPI {
  clear(): void;
  drawBranch(branch: BranchState, windDisplacement: Vec2): void;
  drawBlossom(blossom: Blossom): void;
  drawPetal(petal: Petal): void;
}

/**
 * Creates a renderer bound to the given canvas 2D context.
 * Black and white style — thin dark vines with small leaf shapes.
 */
export function createRenderer(ctx: CanvasRenderingContext2D): RendererAPI {
  function clear(): void {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  }

  function drawBranch(branch: BranchState, windDisplacement: Vec2): void {
    const { segments } = branch;
    if (segments.length === 0) return;

    const totalSegments = segments.length;

    // Thin dark vine
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(30, 30, 30, 0.6)';
    ctx.lineWidth = 1.2;

    // Draw all segments as one continuous path
    ctx.beginPath();
    const seg0 = segments[0];
    ctx.moveTo(seg0.start.x, seg0.start.y);

    for (let i = 0; i < totalSegments; i++) {
      const seg = segments[i];
      const t = totalSegments > 1 ? i / (totalSegments - 1) : 0;
      const wx = windDisplacement.x * t;
      const wy = windDisplacement.y * t;

      ctx.bezierCurveTo(
        seg.cp1.x + wx,
        seg.cp1.y + wy,
        seg.cp2.x + wx,
        seg.cp2.y + wy,
        seg.end.x + wx,
        seg.end.y + wy,
      );
    }
    ctx.stroke();

    // Recursively draw child vines
    for (const child of branch.children) {
      drawBranch(child, windDisplacement);
    }
  }

  function drawBlossom(blossom: Blossom): void {
    const { position, size, rotation, opacity } = blossom;

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity * 0.5;

    // Draw as a simple small leaf shape (pointed ellipse)
    const leafLength = size * 0.8;
    const leafWidth = size * 0.35;

    ctx.beginPath();
    ctx.ellipse(0, 0, leafLength, leafWidth, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(40, 40, 40, 0.4)';
    ctx.fill();

    ctx.restore();
  }

  function drawPetal(petal: Petal): void {
    const { position, size, rotation, scaleY, opacity } = petal;

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.scale(1, scaleY);
    ctx.globalAlpha = opacity;

    // Small falling leaf — dark gray
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.8, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
    ctx.fill();

    ctx.restore();
  }

  return {
    clear,
    drawBranch,
    drawBlossom,
    drawPetal,
  };
}
