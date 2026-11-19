import React, { useState } from 'react';
import { playBitSound } from '../utils/sound';

// 5x7 bit matrix for letters S, A, N, D, B, O, X
const GLYPHS: Record<string, number[][]> = {
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  D: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  X: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
};

const WORD = ['S', 'A', 'N', 'D', 'B', 'O', 'X'];

export const BitWordmark: React.FC = () => {
  const [hoveredBit, setHoveredBit] = useState<string | null>(null);
  const [inverted, setInverted] = useState(false);
  const [scrambled, setScrambled] = useState(false);

  const handleBitClick = (bitKey: string) => {
    playBitSound('toggle');
    setHoveredBit(bitKey);
  };

  const toggleInvert = () => {
    playBitSound('click');
    setInverted(!inverted);
  };

  const handleScrambleResolve = () => {
    playBitSound('flag');
    setScrambled(true);
    setTimeout(() => {
      setScrambled(false);
      playBitSound('click');
    }, 600);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Telemetry header above wordmark */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-bit-muted mb-4 select-none">
        <span className="flex items-center gap-1.5 text-bit-cyan">
          <span className="w-2 h-2 rounded-full bg-bit-cyan animate-pulse"></span>
          ACTIVE_BYTE_MATRIX
        </span>
        <span className="text-bit-border">•</span>
        <button
          onClick={toggleInvert}
          className="px-2 py-0.5 rounded-md hover:bg-bit-panel text-bit-bright hover:text-bit-cyan transition-colors"
          title="Invert 0/1 bits"
        >
          {inverted ? '[NORMAL POLARITY]' : '[INVERT POLARITY]'}
        </button>
        <span className="text-bit-border">•</span>
        <button
          onClick={handleScrambleResolve}
          className="px-2 py-0.5 rounded-md hover:bg-bit-panel text-bit-muted hover:text-bit-bright transition-colors"
          title="Scramble & resolve bit matrix"
        >
          [RESOLVE BITS]
        </button>
      </div>

      {/* Modern Rounded Hardware Enclosure for Bit Wordmark */}
      <div
        className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8 rounded-2xl bg-void-950/80 border border-bit-border/80 shadow-2xl backdrop-blur-xl transition-all"
        role="img"
        aria-label="Sandbox wordmark rendered in 5 by 7 bit matrix"
      >
        {WORD.map((letter, lIdx) => {
          const matrix = GLYPHS[letter];
          return (
            <div key={`${letter}-${lIdx}`} className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
              {matrix.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1 sm:gap-1.5 md:gap-2">
                  {row.map((val, cIdx) => {
                    const bitKey = `${lIdx}-${rIdx}-${cIdx}`;
                    const isHovered = hoveredBit === bitKey;
                    
                    let activeBit = inverted ? val === 0 : val === 1;
                    if (scrambled) {
                      activeBit = Math.random() > 0.5;
                    }

                    return (
                      <button
                        key={cIdx}
                        onClick={() => handleBitClick(bitKey)}
                        onMouseEnter={() => {
                          setHoveredBit(bitKey);
                          playBitSound('keypress');
                        }}
                        onMouseLeave={() => setHoveredBit(null)}
                        className={`
                          w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-[4px]
                          flex items-center justify-center font-mono text-[8px] sm:text-[9px] md:text-[10px] font-bold select-none
                          transition-all duration-150 cursor-pointer
                          ${
                            activeBit
                              ? isHovered
                                ? 'bg-white text-void-950 shadow-[0_0_12px_#ffffff] scale-110'
                                : 'bg-bit-cyan text-void-950 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                              : isHovered
                              ? 'bg-bit-border text-bit-bright scale-105'
                              : 'bg-void-900/90 text-bit-border/50 hover:text-bit-cyan border border-bit-border/40'
                          }
                        `}
                        title={`Bit [${letter}:${rIdx},${cIdx}]`}
                      >
                        {activeBit ? '1' : '0'}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Hex/ASCII Stream beneath Wordmark */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs font-mono text-bit-dim select-none">
        <span className="text-bit-cyan/70 font-semibold">0x53 0x41 0x4E 0x44 0x42 0x4F 0x58</span>
        <span>•</span>
        <span className="text-bit-muted">01010011 01000001 01001110 01000100 01000010 01001111 01011000</span>
      </div>
    </div>
  );
};
