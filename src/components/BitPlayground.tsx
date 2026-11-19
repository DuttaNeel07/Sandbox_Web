import React, { useState, useEffect } from 'react';
import { playBitSound } from '../utils/sound';

const GRID_SIZE = 12;

export const BitPlayground: React.FC = () => {
  const [grid, setGrid] = useState<number[]>(() => {
    // Initial pattern: a neat cyber shield / byte pattern
    const initial = new Array(GRID_SIZE * GRID_SIZE).fill(0);
    // Draw an A / Aegis shape
    [
      16, 17, 18, 19,
      27, 32,
      39, 44,
      51, 52, 53, 54, 55, 56,
      63, 68,
      75, 80,
      87, 92,
      100, 101, 102, 103
    ].forEach((idx) => {
      if (idx < initial.length) initial[idx] = 1;
    });
    return initial;
  });

  const [isRunningLife, setIsRunningLife] = useState(false);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    setActiveCount(grid.filter((b) => b === 1).length);
  }, [grid]);

  // Conway's Game of Life step
  const stepLife = () => {
    setGrid((prev) => {
      const next = [...prev];
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          let neighbors = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = (r + dr + GRID_SIZE) % GRID_SIZE;
              const nc = (c + dc + GRID_SIZE) % GRID_SIZE;
              neighbors += prev[nr * GRID_SIZE + nc];
            }
          }
          const current = prev[r * GRID_SIZE + c];
          if (current === 1 && (neighbors < 2 || neighbors > 3)) {
            next[r * GRID_SIZE + c] = 0;
          } else if (current === 0 && neighbors === 3) {
            next[r * GRID_SIZE + c] = 1;
          }
        }
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isRunningLife) return;
    const interval = setInterval(() => {
      stepLife();
      playBitSound('toggle');
    }, 280);
    return () => clearInterval(interval);
  }, [isRunningLife]);

  const toggleCell = (index: number) => {
    playBitSound('toggle');
    setGrid((prev) => {
      const copy = [...prev];
      copy[index] = copy[index] === 1 ? 0 : 1;
      return copy;
    });
  };

  const loadPreset = (preset: 'clear' | 'glider' | 'random' | 'invert') => {
    playBitSound('click');
    if (preset === 'clear') {
      setGrid(new Array(GRID_SIZE * GRID_SIZE).fill(0));
    } else if (preset === 'random') {
      setGrid(Array.from({ length: GRID_SIZE * GRID_SIZE }, () => (Math.random() > 0.7 ? 1 : 0)));
    } else if (preset === 'invert') {
      setGrid((prev) => prev.map((v) => (v === 1 ? 0 : 1)));
    } else if (preset === 'glider') {
      const next = new Array(GRID_SIZE * GRID_SIZE).fill(0);
      // Glider at top left
      next[1 * GRID_SIZE + 2] = 1;
      next[2 * GRID_SIZE + 3] = 1;
      next[3 * GRID_SIZE + 1] = 1;
      next[3 * GRID_SIZE + 2] = 1;
      next[3 * GRID_SIZE + 3] = 1;
      setGrid(next);
    }
  };

  // Convert first 4 rows to hex representation
  const hexDump = [0, 1, 2, 3].map((rowIdx) => {
    const rowBits = grid.slice(rowIdx * GRID_SIZE, (rowIdx + 1) * GRID_SIZE);
    const byte1 = parseInt(rowBits.slice(0, 8).join(''), 2).toString(16).padStart(2, '0');
    const byte2 = parseInt(rowBits.slice(8, 12).join('').padEnd(8, '0'), 2).toString(16).padStart(2, '0');
    return `0x${byte1.toUpperCase()} 0x${byte2.toUpperCase()}`;
  });

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 sm:p-8 bg-void-950/80 border border-bit-border/80 rounded-2xl shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-bit-border/60">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-bit-cyan mb-1">
            <span className="w-2 h-2 rounded-full bg-bit-cyan animate-pulse"></span>
            <span>INTERACTIVE BIT LAB // CELLULAR AUTOMATA</span>
          </div>
          <h3 className="font-mono text-lg font-bold text-bit-bright">
            Tactile Bitboard & Life Simulator
          </h3>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setIsRunningLife(!isRunningLife)}
            className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
              isRunningLife
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                : 'bg-bit-cyan/20 border-bit-cyan text-bit-cyan hover:bg-bit-cyan/30'
            }`}
          >
            {isRunningLife ? '■ HALT SIM' : '▶ RUN LIFE'}
          </button>
          <button
            onClick={() => loadPreset('glider')}
            className="px-2.5 py-1.5 bg-void-900 hover:bg-bit-panel border border-bit-border rounded-lg text-bit-muted hover:text-bit-bright transition-colors"
          >
            GLIDER
          </button>
          <button
            onClick={() => loadPreset('random')}
            className="px-2.5 py-1.5 bg-void-900 hover:bg-bit-panel border border-bit-border rounded-lg text-bit-muted hover:text-bit-bright transition-colors"
          >
            ENTROPY
          </button>
          <button
            onClick={() => loadPreset('invert')}
            className="px-2.5 py-1.5 bg-void-900 hover:bg-bit-panel border border-bit-border rounded-lg text-bit-muted hover:text-bit-bright transition-colors"
          >
            INVERT
          </button>
          <button
            onClick={() => loadPreset('clear')}
            className="px-2.5 py-1.5 bg-void-900 hover:bg-bit-panel border border-bit-border rounded-lg text-bit-dim hover:text-rose-400 transition-colors"
          >
            CLR
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Interactive 12x12 Bit Grid */}
        <div className="md:col-span-7 flex justify-center">
          <div
            className="grid gap-1.5 sm:gap-2 p-3 sm:p-4 bg-void-900/90 border border-bit-border rounded-xl shadow-inner"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            role="grid"
            aria-label="Interactive 12 by 12 bit grid"
          >
            {grid.map((bit, idx) => (
              <button
                key={idx}
                onClick={() => toggleCell(idx)}
                className={`
                  w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-md font-mono text-[9px] sm:text-[10px] font-bold
                  flex items-center justify-center transition-all duration-150 select-none cursor-pointer
                  ${
                    bit === 1
                      ? 'bg-bit-cyan text-void-950 shadow-[0_0_10px_rgba(56,189,248,0.7)] scale-105'
                      : 'bg-void-950 text-bit-dim/40 hover:text-bit-muted hover:bg-bit-panel/60 border border-bit-border/30'
                  }
                `}
                title={`Bit #${idx} (Row ${Math.floor(idx / GRID_SIZE)}, Col ${idx % GRID_SIZE})`}
              >
                {bit}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Telemetry & Hex Output */}
        <div className="md:col-span-5 space-y-4 font-mono text-xs">
          <div className="p-4 bg-void-900 border border-bit-border rounded-xl space-y-2">
            <span className="text-[10px] text-bit-dim uppercase tracking-wider block">
              BUFFER_REGISTERS (FIRST 4 ROWS)
            </span>
            <div className="space-y-1 text-bit-cyan font-bold text-sm">
              {hexDump.map((h, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-bit-dim text-xs">ROW_0{i}:</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-void-900 border border-bit-border rounded-xl space-y-1.5 text-bit-muted">
            <div className="flex justify-between">
              <span className="text-bit-dim">ACTIVE_BITS:</span>
              <span className="text-bit-bright font-bold">{activeCount} / {GRID_SIZE * GRID_SIZE}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-bit-dim">BIT_DENSITY:</span>
              <span className="text-bit-cyan font-bold">{((activeCount / (GRID_SIZE * GRID_SIZE)) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-bit-dim">SIMULATION:</span>
              <span className={isRunningLife ? 'text-emerald-400 font-bold animate-pulse' : 'text-bit-dim'}>
                {isRunningLife ? 'CELLULAR_AUTOMATA_LIVE' : 'IDLE'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-bit-dim font-sans leading-relaxed">
            Tip: Click any bit cell to toggle its state, or press <strong className="text-bit-cyan font-mono">GLIDER</strong> then <strong className="text-bit-cyan font-mono">RUN LIFE</strong> to simulate John Conway's cellular automation.
          </p>
        </div>
      </div>
    </div>
  );
};
