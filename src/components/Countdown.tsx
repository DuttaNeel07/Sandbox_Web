import React, { useState, useEffect } from 'react';
import { playBitSound } from '../utils/sound';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date('2027-03-06T09:00:00+05:30').getTime();
    const now = new Date().getTime();
    const difference = Math.max(0, targetDate - now);

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const to8Bit = (num: number): string => {
    return num.toString(2).padStart(8, '0');
  };

  const timeUnits = [
    { label: 'DAYS', val: timeLeft.days, reg: 'REG_00' },
    { label: 'HOURS', val: timeLeft.hours, reg: 'REG_01' },
    { label: 'MINUTES', val: timeLeft.minutes, reg: 'REG_02' },
    { label: 'SECONDS', val: timeLeft.seconds, reg: 'REG_03' },
  ];

  return (
    <section id="countdown" className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-y border-bit-border/60 bg-void-950/60 backdrop-blur-md">
      <div className="max-w-5xl mx-auto">
        {/* Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-3 border-b border-bit-border/40 text-xs font-mono text-bit-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bit-cyan animate-pulse"></span>
            <span className="text-bit-bright font-bold">COUNTDOWN REGISTERS</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-bit-dim">
            <span>TARGET WINDOW: SPRING 2027 [TBA]</span>
            <span>•</span>
            <span>TIMEZONE: UTC+05:30 (IST)</span>
          </div>
        </div>

        {/* 4 Rounded Unit Displays */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit) => {
            const binaryStr = to8Bit(unit.val);
            return (
              <div
                key={unit.label}
                className="bit-card-frame p-5 sm:p-6 flex flex-col items-center justify-center relative group"
              >
                <span className="text-[10px] font-mono text-bit-dim mb-1 tracking-widest uppercase">
                  {unit.reg}
                </span>

                <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-bit-text group-hover:text-bit-bright transition-colors">
                  {unit.val.toString().padStart(2, '0')}
                </div>

                <span className="font-mono text-xs tracking-widest text-bit-cyan font-semibold mt-1 mb-3">
                  {unit.label}
                </span>

                {/* 8-Bit Binary Indicator with Interactive Sound */}
                <div className="w-full pt-3 border-t border-bit-border/40 flex flex-col items-center gap-1.5">
                  <div className="flex justify-center gap-1 font-mono text-[9px]">
                    {binaryStr.split('').map((bit, bitIdx) => (
                      <button
                        key={bitIdx}
                        onClick={() => playBitSound('toggle')}
                        className={`
                          w-4 h-5 rounded-[3px] flex items-center justify-center border transition-all duration-200 cursor-pointer
                          ${
                            bit === '1'
                              ? 'border-bit-cyan/60 bg-bit-cyan/25 text-bit-cyan font-bold shadow-[0_0_6px_rgba(56,189,248,0.3)]'
                              : 'border-bit-border/30 bg-void-950/60 text-bit-dim/60 hover:text-bit-muted'
                          }
                        `}
                        title={`Bit ${7 - bitIdx}: ${bit}`}
                      >
                        {bit}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-bit-dim">
                    0b{binaryStr}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic status pill */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-void-900/80 border border-bit-border/60 rounded-xl text-xs font-mono text-bit-muted">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>CLOCK STATE: SYNCHRONIZED</span>
          </div>
          <div className="text-bit-dim">
            <span>REGISTRATION INTEREST ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
