// Canvas rendering routines for the growing-vines animation system

import type { BranchState, Blossom, Petal, Vec2 } from './types';
import { COLORS } from './types';

export interface RendererAPI {
  clear(): void;
  drawBranch(branch: BranchState, windDisplacement: Vec2): void;
  drawBlossom(blossom: Blossom): void;
  drawPetal(petal: Petal): void;
}

/**
 * Linearly interpolate between two values.
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Convert RGB components + alpha to an rgba() CSS string.
 */
function rgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

/**
 * Creates a renderer bound to the given canvas 2D context.
 * All drawing uses logical (CSS) coordinates — the caller is responsible
 * for setting up the DPR transform on the context beforehand.
 */
export function createRenderer(ctx: CanvasRenderingContext2D): RendererAPI {
  function clear(): void {
    // Save current transform, reset to identity to clear the full buffer,
    // then restore. This ensures we clear regardless of any active transform.
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  }

  function drawBranch(branch: BranchState, windDisplacement: Vec2): void {
    const { segments } = branch;
    if (segments.length === 0) return;

    const totalSegments = segments.length;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < totalSegments; i++) {
      const seg = segments[i];
      const t = totalSegments > 1 ? i / (totalSegments - 1) : 0;

      // Interpolate color from base (dark brown) to tip (warm light brown)
      const r = lerp(COLORS.BRANCH_BASE.r, COLORS.BRANCH_TIP.r, t);
      const g = lerp(COLORS.BRANCH_BASE.g, COLORS.BRANCH_TIP.g, t);
      const b = lerp(COLORS.BRANCH_BASE.b, COLORS.BRANCH_TIP.b, t);

      ctx.strokeStyle = rgba(r, g, b, 0.85);
      ctx.lineWidth = seg.thickness;

      // Apply wind displacement to all control points
      const wx = windDisplacement.x * t; // more displacement toward tip
      const wy = windDisplacement.y * t;

      ctx.beginPath();
      ctx.moveTo(seg.start.x + wx, seg.start.y + wy);
      ctx.bezierCurveTo(
        seg.cp1.x + wx,
        seg.cp1.y + wy,
        seg.cp2.x + wx,
        seg.cp2.y + wy,
        seg.end.x + wx,
        seg.end.y + wy,
      );
      ctx.stroke();
    }

    // Recursively draw child branches
    for (const child of branch.children) {
      drawBranch(child, windDisplacement);
    }
  }

  function drawBlossom(blossom: Blossom): void {
    const { position, size, petalCount, rotation, color, opacity } = blossom;

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;

    // Draw petals arranged radially
    const petalLength = size;
    const petalWidth = size * 0.55;

    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const petalOffset = size * 0.4;

      ctx.save();
      ctx.rotate(angle);
      ctx.translate(petalOffset, 0);

      // Draw petal as an ellipse with a soft gradient
      ctx.beginPath();
      ctx.ellipse(0, 0, petalLength, petalWidth, 0, 0, Math.PI * 2);

      // Create radial gradient for petal depth
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petalLength);
      gradient.addColorStop(0, rgba(color.centerR, color.centerG, color.centerB, 1));
      gradient.addColorStop(0.4, rgba(color.r, color.g, color.b, 0.9));
      gradient.addColorStop(1, rgba(color.r, color.g, color.b, 0.6));

      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    }

    // Draw center circle with radial gradient
    const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.35);
    centerGradient.addColorStop(0, rgba(COLORS.BLOSSOM_CENTER.r, COLORS.BLOSSOM_CENTER.g, COLORS.BLOSSOM_CENTER.b, 0.9));
    centerGradient.addColorStop(1, rgba(COLORS.BLOSSOM_CENTER.r, COLORS.BLOSSOM_CENTER.g, COLORS.BLOSSOM_CENTER.b, 0.3));

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = centerGradient;
    ctx.fill();

    ctx.restore();
  }

  function drawPetal(petal: Petal): void {
    const { position, size, rotation, scaleY, opacity } = petal;

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.scale(1, scaleY); // Simulate 3D tumble via Y-axis squash

    ctx.globalAlpha = opacity;

    // Draw petal as an ellipse
    const petalWidth = size;
    const petalHeight = size * 0.6;

    ctx.beginPath();
    ctx.ellipse(0, 0, petalWidth, petalHeight, 0, 0, Math.PI * 2);
    ctx.fillStyle = rgba(COLORS.PETAL_BASE.r, COLORS.PETAL_BASE.g, COLORS.PETAL_BASE.b, opacity);
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
