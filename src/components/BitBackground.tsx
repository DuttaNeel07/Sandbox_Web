import React, { useEffect, useRef } from 'react';

export const BitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const cellSize = 22; // 22px grid for readable yet dense bit matrix
    let cols = 0;
    let rows = 0;

    // Grid data: 0 or 1, and flicker timer
    interface Cell {
      val: number;
      baseAlpha: number;
      curAlpha: number;
      colorHue: number; // blue to cyan range
      flickerSpeed: number;
    }

    let cells: Cell[] = [];
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      cells = new Array(cols * rows);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          
          // Normalized coordinates for gradient
          const nx = c / cols;
          const ny = r / rows;

          // Compute bluish gradient density:
          // Center-radial & vertical blend: deep top-left, ocean mid-right, subtle cyan-tinted depths
          const distFromFocus = Math.hypot(nx - 0.7, ny - 0.35);
          const gradientWeight = Math.max(0, 1 - distFromFocus * 0.95);
          const verticalWeight = Math.sin(ny * Math.PI) * 0.5 + 0.2;

          const combined = gradientWeight * 0.6 + verticalWeight * 0.4;
          
          // Dithered threshold
          const isVisible = (Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1;
          const bitVal = (c + r * 3) % 2 === 0 ? 1 : 0;

          // Opacity range: subtle dark blue background (0.04 to 0.35)
          const baseAlpha = Math.min(0.4, Math.max(0.04, combined * 0.45));

          cells[idx] = {
            val: isVisible > 0.45 ? bitVal : (Math.random() > 0.5 ? 1 : 0),
            baseAlpha,
            curAlpha: baseAlpha,
            colorHue: 200 + Math.sin(nx * 3) * 20, // 180 (cyan) to 220 (navy blue)
            flickerSpeed: 0.005 + Math.random() * 0.015,
          };
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let tick = 0;

    const render = () => {
      tick++;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Base background fill: Deep Midnight Navy #030712
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const mouseRadius = 140;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const cell = cells[idx];
          if (!cell) continue;

          const cx = c * cellSize + cellSize / 2;
          const cy = r * cellSize + cellSize / 2;

          // Distance to cursor
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.hypot(dx, dy);

          let alpha = cell.baseAlpha;
          let isCyanHighlight = false;

          if (dist < mouseRadius) {
            const influence = (1 - dist / mouseRadius);
            alpha = Math.min(0.9, cell.baseAlpha + influence * 0.7);
            isCyanHighlight = influence > 0.35;
          } else if (!prefersReducedMotion && (tick + idx) % 180 === 0) {
            // Rare subtle bit flicker
            alpha = cell.baseAlpha * (0.6 + Math.random() * 0.8);
          }

          if (alpha < 0.03) continue;

          if (isCyanHighlight) {
            ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          } else {
            // Mid blue gradient tone: hsl(215, 70%, 45%) to hsl(225, 60%, 35%)
            const lightness = Math.floor(25 + alpha * 45);
            ctx.fillStyle = `hsla(${cell.colorHue}, 65%, ${lightness}%, ${alpha})`;
          }

          ctx.fillText(cell.val.toString(), cx, cy);
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render();
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
